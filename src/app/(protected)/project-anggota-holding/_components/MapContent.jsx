import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, Marker } from "react-leaflet";
import { Card, Tag, Typography, Space, Badge, Row, Col, Button } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { projectsData, COMPANY_COLORS } from "../_data";

const { Text, Title } = Typography;

// Fix untuk default marker icon Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Komponen untuk mengatur bounds peta agar fokus ke Indonesia dengan zoom controls
const MapController = () => {
  const map = useMap();
  
  useEffect(() => {
    // Set initial bounds untuk Indonesia dengan zoom controls terbatas
    map.setView([-2.5, 118], 5);
    
    // Set zoom limits - bisa zoom out 1x (zoom 4) dan zoom in maksimal (zoom 10)
    map.setMinZoom(4); // Zoom out 1x dari initial
    map.setMaxZoom(10); // Batas maksimal zoom in
    
    // Lock map bounds to Indonesia region
    const indonesiaBounds = [
      [-11, 95], // Southwest coordinates
      [6, 141]   // Northeast coordinates
    ];
    map.setMaxBounds(indonesiaBounds);
    
  }, [map]);

  return null;
};

// Komponen untuk tracking zoom level dan menentukan kapan split points
const MapZoomTracker = ({ onZoomChange }) => {
  const map = useMap();
  
  useEffect(() => {
    const handleZoomEnd = () => {
      const currentZoom = map.getZoom();
      onZoomChange(currentZoom);
    };

    map.on('zoomend', handleZoomEnd);
    
    // Set initial zoom
    handleZoomEnd();

    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [map, onZoomChange]);

  return null;
};

// Function to generate slight offset for individual markers so they don't overlap
const generateMarkerOffset = (index, totalCount) => {
  if (totalCount <= 1) return [0, 0];
  
  // Create circular arrangement for markers
  const radius = 0.01; // Small offset radius in degrees
  const angle = (2 * Math.PI * index) / totalCount;
  
  return [
    radius * Math.cos(angle),
    radius * Math.sin(angle)
  ];
};

// Fungsi untuk menghitung radius berdasarkan budget dengan scaling yang lebih baik
const calculateRadius = (budget) => {
  // Ambil semua budget untuk menentukan min dan max yang sebenarnya
  const allBudgets = projectsData.data.items.map(item => item.budget);
  const minBudget = Math.min(...allBudgets);
  const maxBudget = Math.max(...allBudgets);
  
  // Radius range yang lebih proporsional
  const minRadius = 8;
  const maxRadius = 35;
  
  // Normalisasi budget ke skala 0-1
  const normalized = (budget - minBudget) / (maxBudget - minBudget);
  
  // Return radius yang proporsional
  return Math.round(minRadius + (normalized * (maxRadius - minRadius)));
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

// Get company color berdasarkan company_id
const getCompanyColor = (companyId) => {
  return COMPANY_COLORS[companyId] || "#8c8c8c"; // Default gray if company not found
};

// Legend dengan informasi project size dan zoom controls
const MapLegend = ({ projects, mapRef, currentZoom, showIndividualMarkers }) => {
  // Define legend items berdasarkan perusahaan
  const legendItems = [
    { name: "PT Aneka Tambang Tbk", color: COMPANY_COLORS["1"], count: projects.filter(p => p.company_id === "1").length },
    { name: "PT Bukit Asam Tbk", color: COMPANY_COLORS["2"], count: projects.filter(p => p.company_id === "2").length },
    { name: "PT Freeport Indonesia", color: COMPANY_COLORS["3"], count: projects.filter(p => p.company_id === "3").length },
    { name: "PT Indonesia Asahan Aluminium", color: COMPANY_COLORS["4"], count: projects.filter(p => p.company_id === "4").length },
    { name: "PT Timah Tbk", color: COMPANY_COLORS["5"], count: projects.filter(p => p.company_id === "5").length },
    { name: "PT Vale Indonesia", color: COMPANY_COLORS["6"], count: projects.filter(p => p.company_id === "6").length },
  ].filter(item => item.count > 0); // Hanya tampilkan yang ada projectnya

  // Zoom controls
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  return (
    <Card
      title="Legend & Controls"
      size="small"
      style={{
        height: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>

        {/* Zoom Controls */}
        <div>
          <Text strong style={{ fontSize: "12px", marginBottom: "8px", display: "block" }}>
            Zoom Controls
          </Text>
          <Space direction="horizontal" size="small" style={{ width: "100%" }}>
            <Button 
              type="primary" 
              icon={<ZoomInOutlined />} 
              size="small"
              onClick={handleZoomIn}
              disabled={currentZoom >= 10}
            >
              Zoom In
            </Button>
            <Button 
              type="default" 
              icon={<ZoomOutOutlined />} 
              size="small"
              onClick={handleZoomOut}
              disabled={currentZoom <= 4}
            >
              Zoom Out
            </Button>
          </Space>
          <div style={{ marginTop: "8px" }}>
            <Text style={{ fontSize: "10px", color: "#666" }}>
              Current Zoom: {currentZoom} | {showIndividualMarkers ? "Individual View" : "Group View"}
            </Text>
          </div>
        </div>

        {/* Legend Items */}
        <div>
          <Text strong style={{ fontSize: "12px", marginBottom: "8px", display: "block" }}>
            Companies
          </Text>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            {legendItems.map((item, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                  <Text style={{ fontSize: "11px" }}>{item.name}</Text>
                </div>
                <Badge count={item.count} size="small" style={{ backgroundColor: item.color }} />
              </div>
            ))}
          </Space>
        </div>

      </Space>
    </Card>
  );
};

const MapContent = () => {
  const [projects, setProjects] = useState([]);
  const [cityGroups, setCityGroups] = useState([]);
  const [mapRef, setMapRef] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(5);
  const [showIndividualMarkers, setShowIndividualMarkers] = useState(false);

  useEffect(() => {
    const projectItems = projectsData.data.items.map(project => ({
      ...project,
      // Assign colors based on company_id for consistency with legend
      color: getCompanyColor(project.company_id)
    }));
    
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
      
      return {
        city,
        projects: cityProjects,
        coordinates: centerCoordinates,
        projectCount: cityProjects.length,
        // Use company-based color consistently
        color: getCompanyColor(cityProjects[0].company_id)
      };
    });

    setCityGroups(cityGroupsArray);
  }, []);

  // Handle zoom changes and determine when to split markers
  const handleZoomChange = (newZoom) => {
    setCurrentZoom(newZoom);
    // Split markers when zoom level is 7 or higher
    setShowIndividualMarkers(newZoom >= 7);
  };

  // Format currency always in Miliar Rupiah
  const formatCurrency = (value) => {
    return `Rp ${(value / 1000000000).toFixed(1)} Miliar`;
  };

  return (
    <Row gutter={16} style={{ width: "100%", height: "600px" }}>
      {/* Map on the left */}
      <Col span={18} style={{ height: "100%" }}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <MapContainer
            center={[-2.5, 118]}
            zoom={5}
            minZoom={4}
            maxZoom={10}
            style={{ width: "100%", height: "100%", borderRadius: "8px" }}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            whenCreated={(map) => setMapRef(map)}
          >
            <MapController />
            <MapZoomTracker onZoomChange={handleZoomChange} />
            
            {/* Tile Layer - OpenStreetMap */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render markers based on zoom level */}
            {cityGroups.map((cityGroup) => {
              if (cityGroup.projectCount > 1) {
                if (showIndividualMarkers) {
                  // Show individual markers when zoomed in
                  return cityGroup.projects.map((project, index) => {
                    const [offsetLat, offsetLng] = generateMarkerOffset(index, cityGroup.projectCount);
                    const adjustedCoordinates = [
                      project.coordinates[0] + offsetLat,
                      project.coordinates[1] + offsetLng
                    ];

                    return (
                      <CircleMarker
                        key={`individual-${project.id}`}
                        center={adjustedCoordinates}
                        radius={calculateRadius(project.budget)}
                        pathOptions={{
                          fillColor: project.color,
                          fillOpacity: 0.8,
                          color: "white",
                          weight: 3,
                          opacity: 1,
                        }}
                      >
                        <Popup>
                          <div style={{ minWidth: "280px" }}>
                            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                              <div>
                                <Text strong style={{ fontSize: "14px" }}>Nama Proyek</Text><br/>
                                <Text style={{ fontSize: "12px", marginLeft: "8px" }}>{project.name}</Text>
                              </div>
                              <div>
                                <Text strong style={{ fontSize: "14px" }}>Total Capex</Text><br/>
                                <Text style={{ fontSize: "12px", marginLeft: "8px", color: "#fa8c16", fontWeight: "bold" }}>{formatCurrency(project.budget)}</Text>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "48%" }}>
                                  <Text strong style={{ fontSize: "14px" }}>Company</Text><br/>
                                  <Text style={{ fontSize: "12px", marginLeft: "8px" }}>{project.company_name}</Text>
                                </div>
                                <div style={{ width: "2%", textAlign: "center", alignSelf: "center" }}>
                                  <Text strong>|</Text>
                                </div>
                                <div style={{ width: "48%" }}>
                                  <Text strong style={{ fontSize: "14px" }}>Fase</Text><br/>
                                  <Tag size="small" color={project.status === "In Progress" ? "blue" : "orange"} style={{ marginLeft: "8px" }}>
                                    {project.status}
                                  </Tag>
                                </div>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "48%" }}>
                                  <Text strong style={{ fontSize: "14px" }}>Progress</Text><br/>
                                  <Text style={{ fontSize: "12px", marginLeft: "8px" }}>{project.progress}%</Text>
                                </div>
                                <div style={{ width: "2%", textAlign: "center", alignSelf: "center" }}>
                                  <Text strong>|</Text>
                                </div>
                                <div style={{ width: "48%" }}>
                                  <Text strong style={{ fontSize: "14px" }}>Target</Text><br/>
                                  <Text style={{ fontSize: "12px", marginLeft: "8px" }}>{project.target}</Text>
                                </div>
                              </div>
                            </Space>
                          </div>
                        </Popup>
                      </CircleMarker>
                    );
                  });
                } else {
                  // Show grouped count marker when zoomed out
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
                              <Text style={{ fontSize: "12px", color: "#666", fontStyle: "italic" }}>
                                💡 Zoom in to level 7+ to see individual projects
                              </Text>
                            </div>
                              <div>
                                <Text strong>Projects:</Text>
                                <div style={{ marginTop: "8px" }}>
                                  {cityGroup.projects.map((project, index) => (
                                    <div key={project.id} style={{ 
                                      marginBottom: "12px", 
                                      padding: "10px", 
                                      backgroundColor: "#f5f5f5", 
                                      borderRadius: "4px",
                                      borderLeft: `4px solid ${project.color}`
                                    }}>
                                      <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                        <div>
                                          <Text strong style={{ fontSize: "11px" }}>Nama Proyek</Text><br/>
                                          <Text style={{ fontSize: "10px", marginLeft: "4px" }}>{project.name}</Text>
                                        </div>
                                        <div>
                                          <Text strong style={{ fontSize: "11px" }}>Total Capex</Text><br/>
                                          <Text style={{ fontSize: "10px", marginLeft: "4px", color: "#fa8c16", fontWeight: "bold" }}>{formatCurrency(project.budget)}</Text>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                          <div style={{ width: "48%" }}>
                                            <Text strong style={{ fontSize: "11px" }}>Company</Text><br/>
                                            <Text style={{ fontSize: "10px", marginLeft: "4px" }}>{project.company_name}</Text>
                                          </div>
                                          <div style={{ width: "2%", textAlign: "center", alignSelf: "center" }}>
                                            <Text strong style={{ fontSize: "10px" }}>|</Text>
                                          </div>
                                          <div style={{ width: "48%" }}>
                                            <Text strong style={{ fontSize: "11px" }}>Fase</Text><br/>
                                            <Tag size="small" color={project.status === "In Progress" ? "blue" : "orange"} style={{ marginLeft: "4px", fontSize: "9px" }}>
                                              {project.status}
                                            </Tag>
                                          </div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                          <div style={{ width: "48%" }}>
                                            <Text strong style={{ fontSize: "11px" }}>Progress</Text><br/>
                                            <Text style={{ fontSize: "10px", marginLeft: "4px" }}>{project.progress}%</Text>
                                          </div>
                                          <div style={{ width: "2%", textAlign: "center", alignSelf: "center" }}>
                                            <Text strong style={{ fontSize: "10px" }}>|</Text>
                                          </div>
                                          <div style={{ width: "48%" }}>
                                            <Text strong style={{ fontSize: "11px" }}>Target</Text><br/>
                                            <Text style={{ fontSize: "10px", marginLeft: "4px" }}>{project.target}</Text>
                                          </div>
                                        </div>
                                      </Space>
                                    </div>
                                  ))}
                                </div>
                              </div>
                          </Space>
                        </div>
                      </Popup>
                    </Marker>
                  );
                }
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
                      <div style={{ minWidth: "280px" }}>
                        <Space direction="vertical" size="small" style={{ width: "100%" }}>
                          <div>
                            <Text strong style={{ fontSize: "14px" }}>Nama Proyek</Text><br/>
                            <Text style={{ fontSize: "12px", marginLeft: "8px" }}>{project.name}</Text>
                          </div>
                          <div>
                            <Text strong style={{ fontSize: "14px" }}>Total Capex</Text><br/>
                            <Text style={{ fontSize: "12px", marginLeft: "8px", color: "#fa8c16", fontWeight: "bold" }}>{formatCurrency(project.budget)}</Text>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "48%" }}>
                              <Text strong style={{ fontSize: "14px" }}>Company</Text><br/>
                              <Text style={{ fontSize: "12px", marginLeft: "8px" }}>{project.company_name}</Text>
                            </div>
                            <div style={{ width: "2%", textAlign: "center", alignSelf: "center" }}>
                              <Text strong>|</Text>
                            </div>
                            <div style={{ width: "48%" }}>
                              <Text strong style={{ fontSize: "14px" }}>Fase</Text><br/>
                              <Tag size="small" color={project.status === "In Progress" ? "blue" : "orange"} style={{ marginLeft: "8px" }}>
                                {project.status}
                              </Tag>
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "48%" }}>
                              <Text strong style={{ fontSize: "14px" }}>Progress</Text><br/>
                              <Text style={{ fontSize: "12px", marginLeft: "8px" }}>{project.progress}%</Text>
                            </div>
                            <div style={{ width: "2%", textAlign: "center", alignSelf: "center" }}>
                              <Text strong>|</Text>
                            </div>
                            <div style={{ width: "48%" }}>
                              <Text strong style={{ fontSize: "14px" }}>Target</Text><br/>
                              <Text style={{ fontSize: "12px", marginLeft: "8px" }}>{project.target}</Text>
                            </div>
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
        <MapLegend projects={projects} mapRef={{ current: mapRef }} currentZoom={currentZoom} showIndividualMarkers={showIndividualMarkers} />
      </Col>
    </Row>
  );
};

export default MapContent;
