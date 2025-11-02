import { Space, Table, Row, Col, Card, Statistic, Progress, Tag } from "antd";
import { Section, Tabs } from "admiral";
import { Column, Bar, Line } from "@ant-design/plots";
import "@/styles/project-detail-tabs.css";

const DataVisualizationContent = () => {
  // Data untuk Realisasi Cost Bulanan (Million USD)
  const realisasiBulananData = [
    { month: "Jan 2024", value: 12 },
    { month: "Feb 2024", value: 20 },
    { month: "Mar 2024", value: 22 },
    { month: "Apr 2024", value: 24 },
    { month: "Mei 2024", value: 18 },
    { month: "Juni 2024", value: 12 },
    { month: "Juli 2024", value: 21 },
    { month: "Aug 2024", value: 9 },
    { month: "Sept 2024", value: 21 },
    { month: "Okt 2024", value: 22 },
    { month: "Nov 2024", value: 17 },
    { month: "Des 2024", value: 18 },
  ];

  // Data untuk Realisasi Cost Kumulatif (Million USD)
  const realisasiKumulatifData = [
    { month: "Jan 2024", value: 20 },
    { month: "Feb 2024", value: 20 },
    { month: "Mar 2024", value: 21 },
    { month: "Apr 2024", value: 22 },
    { month: "Mei 2024", value: 23 },
    { month: "Juni 2024", value: 24 },
    { month: "Juli 2024", value: 23 },
    { month: "Aug 2024", value: 22 },
    { month: "Sept 2024", value: 22 },
    { month: "Okt 2024", value: 22 },
    { month: "Nov 2024", value: 21 },
    { month: "Des 2024", value: 20 },
  ];

  // Konfigurasi untuk chart Realisasi Cost Bulanan
  const configBulanan = {
    data: realisasiBulananData,
    xField: "month",
    yField: "value",
    height: 300,
    color: "#19315a",
    columnStyle: {
      radius: [2, 2, 0, 0],
      fill: "#19315a",
    },
    label: {
      position: "top",
      style: {
        fill: "#000",
        fontSize: 11,
      },
    },
    xAxis: {
      label: {
        style: {
          fontSize: 10,
        },
      },
    },
    yAxis: {
      max: 30,
      label: {
        style: {
          fontSize: 11,
        },
      },
      grid: {
        line: {
          style: {
            stroke: "#e8e8e8",
            strokeOpacity: 0.7,
          },
        },
      },
    },
    meta: {
      value: {
        alias: "Cost (Million USD)",
      },
      month: {
        alias: "Period",
      },
    },
  };

  // Konfigurasi untuk chart Realisasi Cost Kumulatif
  const configKumulatif = {
    data: realisasiKumulatifData,
    xField: "month",
    yField: "value",
    height: 300,
    color: "#c41e3a",
    columnStyle: {
      radius: [2, 2, 0, 0],
      fill: "#c41e3a",
    },
    label: {
      position: "top",
      style: {
        fill: "#000",
        fontSize: 11,
      },
    },
    xAxis: {
      label: {
        style: {
          fontSize: 10,
        },
      },
    },
    yAxis: {
      max: 30,
      label: {
        style: {
          fontSize: 11,
        },
      },
      grid: {
        line: {
          style: {
            stroke: "#e8e8e8",
            strokeOpacity: 0.7,
          },
        },
      },
    },
    meta: {
      value: {
        alias: "Cost (Million USD)",
      },
      month: {
        alias: "Period",
      },
    },
  };

  // Data dummy untuk Risk Heatmap - Simple grid with numbers
  const riskHeatmapData = [
    // Row 5 (top)
    { x: 1, y: 5, color: "#90EE90", riskNumber: null },
    { x: 2, y: 5, color: "#FFFF99", riskNumber: null },
    { x: 3, y: 5, color: "#FFFF99", riskNumber: null },
    { x: 4, y: 5, color: "#FF6347", riskNumber: 1 },
    { x: 5, y: 5, color: "#FF0000", riskNumber: null },
    
    // Row 4
    { x: 1, y: 4, color: "#90EE90", riskNumber: null },
    { x: 2, y: 4, color: "#90EE90", riskNumber: null },
    { x: 3, y: 4, color: "#FFFF99", riskNumber: 6 },
    { x: 4, y: 4, color: "#FFA500", riskNumber: 5 },
    { x: 5, y: 4, color: "#FF6347", riskNumber: 2 },
    
    // Row 3
    { x: 1, y: 3, color: "#90EE90", riskNumber: null },
    { x: 2, y: 3, color: "#90EE90", riskNumber: null },
    { x: 3, y: 3, color: "#FFFF99", riskNumber: 7 },
    { x: 4, y: 3, color: "#FFA500", riskNumber: 4 },
    { x: 5, y: 3, color: "#FF6347", riskNumber: null },
    
    // Row 2
    { x: 1, y: 2, color: "#90EE90", riskNumber: 9 },
    { x: 2, y: 2, color: "#ADFF2F", riskNumber: null },
    { x: 3, y: 2, color: "#ADFF2F", riskNumber: null },
    { x: 4, y: 2, color: "#FFA500", riskNumber: 8 },
    { x: 5, y: 2, color: "#FF6347", riskNumber: null },
    
    // Row 1 (bottom)
    { x: 1, y: 1, color: "#90EE90", riskNumber: null },
    { x: 2, y: 1, color: "#90EE90", riskNumber: null },
    { x: 3, y: 1, color: "#ADFF2F", riskNumber: null },
    { x: 4, y: 1, color: "#FFFF99", riskNumber: null },
    { x: 5, y: 1, color: "#FF6347", riskNumber: 3 },
  ];

  // Data dummy untuk Top Risk table
  const topRiskData = [
    { key: '1', no: 1, risk: 'Budget overrun due to material cost increase' },
    { key: '2', no: 2, risk: 'Delays in environmental permit approval' },
    { key: '3', no: 3, risk: 'Shortage of skilled technicians for installation' },
    { key: '4', no: 4, risk: 'Equipment delivery delays from suppliers' },
    { key: '5', no: 5, risk: 'Weather conditions affecting construction schedule' },
    { key: '6', no: 6, risk: 'Changes in regulatory requirements' },
    { key: '7', no: 7, risk: 'Local community resistance to project' },
  ];

  const topRiskColumns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      width: 50,
      align: 'center',
    },
    {
      title: 'Risk',
      dataIndex: 'risk',
      key: 'risk',
    },
  ];

  // Data dummy untuk Risk Focus table
  const riskFocusData = [
    {
      key: '1',
      penyebab: 'Penyebab',
      mitigasi: 'Mitigasi yang telah dilakukan'
    },
    {
      key: '2',
      penyebab: 'Fluktuasi harga material global akibat inflasi',
      mitigasi: 'Kontrak fixed-price dengan supplier utama'
    },
    {
      key: '3',
      penyebab: 'Dampak',
      mitigasi: 'Usulan perbaikan/tambahan mitigasi'
    },
    {
      key: '4',
      penyebab: 'Overrun budget hingga 15% dan delay timeline',
      mitigasi: 'Diversifikasi supplier dan kontrak backup'
    },
  ];

  const riskFocusColumns = [
    {
      title: 'Penyebab',
      dataIndex: 'penyebab',
      key: 'penyebab',
      width: '50%',
    },
    {
      title: 'Mitigasi yang telah dilakukan',
      dataIndex: 'mitigasi',
      key: 'mitigasi',
      width: '50%',
    },
  ];

  // Data dummy untuk Mitigation Status
  const mitigationStatusData = [
    { status: "Planned", count: 6 },
    { status: "In Progress", count: 4 },
    { status: "Partially Done", count: 2 },
    { status: "Done", count: 3 },
  ];

  const mitigationStatusConfig = {
    data: mitigationStatusData,
    xField: "count",
    yField: "status",
    height: 200,
    color: (data) => {
      switch(data.status) {
        case "Planned": return "#19315a";
        case "In Progress": return "#c41e3a";
        case "Partially Done": return "#2a4a7a";
        case "Done": return "#21426e";
        default: return "#19315a";
      }
    },
    label: {
      position: "right",
      style: {
        fill: "#000",
        fontSize: 12,
      },
    },
    xAxis: {
      max: 6,
      grid: {
        line: {
          style: {
            stroke: "#e8e8e8",
            strokeOpacity: 0.7,
          },
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fontSize: 11,
        },
      },
    },
  };

  // Data dummy untuk Project Change Status
  const changeStatusData = [
    { category: "Quality", count: 3 },
    { category: "Costy", count: 4 },
    { category: "Scope", count: 2 },
    { category: "Schedule", count: 3 },
  ];

  const changeStatusConfig = {
    data: changeStatusData,
    xField: "category",
    yField: "count",
    height: 300,
    color: (data) => {
      switch(data.category) {
        case "Quality": return "#19315a";
        case "Costy": return "#c41e3a";
        case "Scope": return "#2a4a7a";
        case "Schedule": return "#21426e";
        default: return "#19315a";
      }
    },
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    label: {
      position: "top",
      style: {
        fill: "#000",
        fontSize: 12,
      },
    },
    xAxis: {
      label: {
        style: {
          fontSize: 11,
        },
      },
    },
    yAxis: {
      max: 5,
      grid: {
        line: {
          style: {
            stroke: "#e8e8e8",
            strokeOpacity: 0.7,
          },
        },
      },
    },
  };

  // Data dummy untuk Change Status table
  const changeStatusTableData = [
    {
      key: '1',
      areaTerdampak: 'Construction Phase',
      deskripsiPerubahan: 'Material specification upgrade for better durability',
      deskripsiDampak: 'Increased cost by 8% but improved quality standards',
      progressUpdate: '75% - Procurement in progress',
      deadline: '2025-02-15',
      pic: 'Engineering Team',
      status: 'In Progress'
    },
    {
      key: '2',
      areaTerdampak: 'Installation Phase',
      deskripsiPerubahan: 'Additional safety measures implementation',
      deskripsiDampak: 'Extended timeline by 2 weeks, improved safety compliance',
      progressUpdate: '100% - Safety protocols implemented',
      deadline: '2025-01-30',
      pic: 'Safety Manager',
      status: 'Completed'
    },
    {
      key: '3',
      areaTerdampak: 'Testing Phase',
      deskripsiPerubahan: 'Enhanced testing procedures for quality assurance',
      deskripsiDampak: 'Additional 1 week testing time, reduced future maintenance',
      progressUpdate: '30% - Test plan preparation',
      deadline: '2025-03-10',
      pic: 'QA Team',
      status: 'Planning'
    },
  ];

  const changeStatusTableColumns = [
    {
      title: 'Area Terdampak',
      dataIndex: 'areaTerdampak',
      key: 'areaTerdampak',
      width: 120,
    },
    {
      title: 'Deskripsi Perubahan',
      dataIndex: 'deskripsiPerubahan',
      key: 'deskripsiPerubahan',
      width: 150,
    },
    {
      title: 'Deskripsi Dampak Perubahan',
      dataIndex: 'deskripsiDampak',
      key: 'deskripsiDampak',
      width: 150,
    },
    {
      title: 'Progress Update',
      dataIndex: 'progressUpdate',
      key: 'progressUpdate',
      width: 130,
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 100,
    },
    {
      title: 'PIC',
      dataIndex: 'pic',
      key: 'pic',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
  ];

  // Data dummy untuk Gantt Chart - Sederhana sesuai gambar
  const ganttData = [
    {
      key: '1',
      complete: 100,
      wbs: '1',
      taskName: 'ITEM HALITIM',
      resourceNames: 'Anggota holding',
      baselineStart: 'Wed 12/30/20',
      baselineFinish: 'Tue 6/29/21',
      baselineDuration: '130 days',
      status: <Tag color="green">Completed</Tag>,
    },
    {
      key: '2',
      complete: 100,
      wbs: '1.1',
      taskName: 'Inisiasi',
      resourceNames: 'Anggota holding',
      baselineStart: 'Wed 12/30/20',
      baselineFinish: 'Mon 2/1/21',
      baselineDuration: '24 days',
      status: <Tag color="green">Completed</Tag>,
    },
    {
      key: '3',
      complete: 100,
      wbs: '1.1.1',
      taskName: 'Menyusun Feasibility Study',
      resourceNames: 'Anggota holding',
      baselineStart: 'Wed 12/30/20',
      baselineFinish: 'Fri 1/8/21',
      baselineDuration: '8 days',
      status: <Tag color="green">Completed</Tag>,
    },
    {
      key: '4',
      complete: 100,
      wbs: '1.1.1.1',
      taskName: 'Melakukan kajian market & competitor',
      resourceNames: 'Anggota holding',
      baselineStart: 'Wed 12/30/20',
      baselineFinish: 'Tue 1/5/21',
      baselineDuration: '5 days',
      status: <Tag color="green">Completed</Tag>,
    },
    {
      key: '5',
      complete: 100,
      wbs: '1.1.1.2',
      taskName: 'Melakukan kajian produk',
      resourceNames: 'Anggota holding',
      baselineStart: 'Wed 12/30/20',
      baselineFinish: 'Tue 1/5/21',
      baselineDuration: '5 days',
      status: <Tag color="green">Completed</Tag>,
    },
    {
      key: '6',
      complete: 100,
      wbs: '1.1.1.3',
      taskName: 'Melakukan kajian finansial',
      resourceNames: 'Anggota holding',
      baselineStart: 'Wed 12/30/20',
      baselineFinish: 'Tue 1/5/21',
      baselineDuration: '5 days',
      status: <Tag color="green">Completed</Tag>,
    },
    {
      key: '7',
      complete: 100,
      wbs: '1.1.1.4',
      taskName: 'Menyusun dokumen feasibility study',
      resourceNames: 'Anggota holding',
      baselineStart: 'Wed 1/6/21',
      baselineFinish: 'Wed 1/6/21',
      baselineDuration: '1 day',
      status: <Tag color="green">Completed</Tag>,
    },
    {
      key: '8',
      complete: 100,
      wbs: '1.1.2',
      taskName: 'Membuat Project Charter',
      resourceNames: 'Anggota holding',
      baselineStart: 'Mon 1/11/21',
      baselineFinish: 'Wed 1/20/21',
      baselineDuration: '8 days',
      status: <Tag color="green">Completed</Tag>,
    },
    {
      key: '9',
      complete: 100,
      wbs: '1.1.2.5',
      taskName: 'Menyusun high-level ruang lingkup proyek',
      resourceNames: 'Anggota holding',
      baselineStart: 'Thu 1/14/21',
      baselineFinish: 'Mon 1/18/21',
      baselineDuration: '3 days',
      status: <Tag color="red">Critical</Tag>,
    },
  ];

  const ganttColumns = [
    {
      title: 'Complete',
      dataIndex: 'complete',
      key: 'complete',
      width: 80,
      render: (value) => <Progress percent={value} size="small" />,
    },
    {
      title: 'WBS',
      dataIndex: 'wbs',
      key: 'wbs',
      width: 60,
    },
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      key: 'taskName',
      width: 200,
    },
    {
      title: 'Resource Names',
      dataIndex: 'resourceNames',
      key: 'resourceNames',
      width: 150,
    },
    {
      title: 'Baseline Start',
      dataIndex: 'baselineStart',
      key: 'baselineStart',
      width: 120,
    },
    {
      title: 'Baseline Finish',
      dataIndex: 'baselineFinish',
      key: 'baselineFinish',
      width: 120,
    },
    {
      title: 'Baseline Duration',
      dataIndex: 'baselineDuration',
      key: 'baselineDuration',
      width: 120,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
  ];

  // Data dummy untuk S-Curve Progress - Baseline, Forecast, dan Aktual
  const sCurveData = [
    // Baseline Progress (biru) - S-Curve lengkap kumulatif
    { month: 'Jan 2024', progress: 2, type: 'Baseline' },
    { month: 'Feb 2024', progress: 5, type: 'Baseline' },
    { month: 'Mar 2024', progress: 12, type: 'Baseline' },
    { month: 'Apr 2024', progress: 25, type: 'Baseline' },
    { month: 'May 2024', progress: 45, type: 'Baseline' },
    { month: 'Jun 2024', progress: 65, type: 'Baseline' },
    { month: 'Jul 2024', progress: 80, type: 'Baseline' },
    { month: 'Aug 2024', progress: 90, type: 'Baseline' },
    { month: 'Sep 2024', progress: 95, type: 'Baseline' },
    { month: 'Oct 2024', progress: 98, type: 'Baseline' },
    { month: 'Nov 2024', progress: 99, type: 'Baseline' },
    { month: 'Dec 2024', progress: 100, type: 'Baseline' },
    
    // Forecast Progress (hijau) - S-Curve lengkap kumulatif
    { month: 'Jan 2024', progress: 1.5, type: 'Forecast' },
    { month: 'Feb 2024', progress: 4, type: 'Forecast' },
    { month: 'Mar 2024', progress: 10, type: 'Forecast' },
    { month: 'Apr 2024', progress: 21, type: 'Forecast' },
    { month: 'May 2024', progress: 39, type: 'Forecast' },
    { month: 'Jun 2024', progress: 61, type: 'Forecast' },
    { month: 'Jul 2024', progress: 77, type: 'Forecast' },
    { month: 'Aug 2024', progress: 89, type: 'Forecast' },
    { month: 'Sep 2024', progress: 95, type: 'Forecast' },
    { month: 'Oct 2024', progress: 98, type: 'Forecast' },
    { month: 'Nov 2024', progress: 99.5, type: 'Forecast' },
    { month: 'Dec 2024', progress: 100, type: 'Forecast' },
    
    // Aktual Progress (merah) - S-Curve belum selesai, berhenti di Agustus
    { month: 'Jan 2024', progress: 1, type: 'Aktual' },
    { month: 'Feb 2024', progress: 3, type: 'Aktual' },
    { month: 'Mar 2024', progress: 8, type: 'Aktual' },
    { month: 'Apr 2024', progress: 18, type: 'Aktual' },
    { month: 'May 2024', progress: 35, type: 'Aktual' },
    { month: 'Jun 2024', progress: 50, type: 'Aktual' },
    { month: 'Jul 2024', progress: 60, type: 'Aktual' },
    { month: 'Aug 2024', progress: 65, type: 'Aktual' },
  ];

  const sCurveConfig = {
    data: sCurveData,
    xField: 'month',
    yField: 'progress',
    seriesField: 'type',
    height: 400,
    color: (datum) => {
      switch(datum.type) {
        case 'Baseline': return '#1890ff';
        case 'Forecast': return '#52c41a';
        case 'Aktual': return '#c41e3a';
        default: return '#1890ff';
      }
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
        return `${item.progress}%`;
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
          value: `${datum.progress}%`,
        };
      },
    },
  };

  // Tab items untuk Data Visualisasi - Versi Simple & Error-Free
  const visualizationTabs = [
    {
      key: "realisasi-cost",
      label: "Realisasi Cost",
      children: (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Chart Realisasi Cost Bulanan */}
          <Section 
            title="Realisasi Cost Bulanan (Million USD)"
            style={{ 
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e8e8e8"
            }}
          >
            <Column {...configBulanan} />
          </Section>

          {/* Chart Realisasi Cost Kumulatif */}
          <Section 
            title="Realisasi Cost Kumulatif (Million USD)"
            style={{ 
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e8e8e8"
            }}
          >
            <Column {...configKumulatif} />
          </Section>
        </Space>
      ),
    },
    {
      key: "project-risks",
      label: "Project Risks",
      children: (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Grid untuk 4 komponen risk */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "24px",
            width: "100%" 
          }}>
            {/* Risk Heatmap */}
            <Section 
              title="Risk Heatmap"
              style={{ 
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e8e8e8"
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%', 
                height: '250px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  marginTop: '10px'
                }}>
                  {/* Likelihood label */}
                  <div style={{ 
                    fontSize: '12px',
                    fontWeight: 'bold',
                    writingMode: 'vertical-lr',
                    textOrientation: 'mixed',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    Likelihood
                  </div>
                  
                  {/* Heatmap grid */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(5, 1fr)', 
                    gridTemplateRows: 'repeat(5, 1fr)',
                    gap: '2px',
                    width: '200px',
                    height: '200px'
                  }}>
                    {riskHeatmapData
                      .sort((a, b) => b.y - a.y)
                      .map((cell, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: cell.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: '#000',
                            border: '1px solid #fff'
                          }}
                        >
                          {cell.riskNumber && (
                            <div style={{ 
                              backgroundColor: 'rgba(0,0,0,0.8)',
                              color: 'white',
                              borderRadius: '50%',
                              width: '18px',
                              height: '18px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '10px'
                            }}>
                              {cell.riskNumber}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Impact label */}
                <div style={{ 
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginTop: '8px'
                }}>
                  Impact
                </div>
              </div>
            </Section>

            {/* Top Risk */}
            <Section 
              title="Top Risk"
              style={{ 
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e8e8e8"
              }}
            >
              <Table
                columns={topRiskColumns}
                dataSource={topRiskData}
                pagination={false}
                size="small"
                bordered
                style={{ height: "300px" }}
              />
            </Section>

            {/* Risk Focus */}
            <Section 
              title="Risk Focus"
              style={{ 
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e8e8e8"
              }}
            >
              <Table
                columns={riskFocusColumns}
                dataSource={riskFocusData}
                pagination={false}
                size="small"
                bordered
                showHeader={false}
              />
            </Section>

            {/* Mitigation Status */}
            <Section 
              title="Mitigation Status"
              style={{ 
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e8e8e8"
              }}
            >
              <Bar {...mitigationStatusConfig} />
            </Section>
          </div>
        </Space>
      ),
    },
    {
      key: "change-status",
      label: "Change Status",
      children: (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Top Row - Chart and Total Box */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "24px",
            width: "100%" 
          }}>
            {/* Project Change Status Chart */}
            <Section 
              title="Project Change Status"
              style={{ 
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e8e8e8"
              }}
            >
              <Column {...changeStatusConfig} />
            </Section>

            {/* Total Open and Close Change */}
            <Section 
              title="Total Open and Close Change"
              style={{ 
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e8e8e8",
                height: "300px"
              }}
            >
              <div style={{ 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                fontSize: "16px",
                color: "#666",
                backgroundColor: "#fafafa",
                borderRadius: "8px",
                border: "2px dashed #d9d9d9"
              }}>
                Change summary will be displayed here
              </div>
            </Section>
          </div>

          {/* Change Status Table */}
          <Section 
            style={{ 
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e8e8e8"
            }}
          >
            <Table
              columns={changeStatusTableColumns}
              dataSource={changeStatusTableData}
              pagination={false}
              size="small"
              bordered
              scroll={{ x: 'max-content' }}
            />
          </Section>
        </Space>
      ),
    },
    {
      key: "basic-scurve",
      label: "Basic S-Curve",
      children: (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Top Row - Baseline, Forecast, Aktual dan Info */}
          <Row gutter={[24, 24]}>
            <Col span={4}>
              <Card 
                style={{ 
                  backgroundColor: "#1890ff", 
                  color: "white",
                  textAlign: "center"
                }}
              >
                <Statistic
                  title={<span style={{ color: "white", fontWeight: "bold" }}>BASELINE</span>}
                  value={90}
                  suffix="%"
                  valueStyle={{ color: "white", fontSize: "24px", fontWeight: "bold" }}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card 
                style={{ 
                  backgroundColor: "#52c41a", 
                  color: "white",
                  textAlign: "center"
                }}
              >
                <Statistic
                  title={<span style={{ color: "white", fontWeight: "bold" }}>FORECAST</span>}
                  value={89}
                  suffix="%"
                  valueStyle={{ color: "white", fontSize: "24px", fontWeight: "bold" }}
                />
              </Card>
            </Col>
            <Col span={4}>
              <Card 
                style={{ 
                  backgroundColor: "#19315a", 
                  color: "white",
                  textAlign: "center"
                }}
              >
                <Statistic
                  title={<span style={{ color: "white", fontWeight: "bold" }}>AKTUAL</span>}
                  value={65}
                  suffix="%"
                  valueStyle={{ color: "#c41e3a", fontSize: "24px", fontWeight: "bold" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "8px", fontWeight: "bold" }}>Fase Saat Ini:</div>
                <div style={{ 
                  backgroundColor: "#f0f0f0", 
                  padding: "8px", 
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9"
                }}>
                  Construction
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "8px", fontWeight: "bold" }}>Periode:</div>
                <div style={{ 
                  backgroundColor: "#f0f0f0", 
                  padding: "8px", 
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9"
                }}>
                  1 Jan 2024 - 31 Agt 2024
                </div>
              </Card>
            </Col>
          </Row>

          {/* S-Curve Chart with Integrated Progress Bars */}
          <Section 
            style={{ 
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e8e8e8"
            }}
          >
            <div style={{ position: "relative" }}>
              <Line {...sCurveConfig} />
              
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
                    { month: 'Jan', actual: 1, baseline: 2 },
                    { month: 'Feb', actual: 2, baseline: 3 },
                    { month: 'Mar', actual: 5, baseline: 7 },
                    { month: 'Apr', actual: 10, baseline: 13 },
                    { month: 'May', actual: 17, baseline: 20 },
                    { month: 'Jun', actual: 15, baseline: 20 },
                    { month: 'Jul', actual: 10, baseline: 15 },
                    { month: 'Aug', actual: 5, baseline: 10 },
                    { month: 'Sep', actual: null, baseline: 5 },
                    { month: 'Oct', actual: null, baseline: 3 },
                    { month: 'Nov', actual: null, baseline: 1 },
                    { month: 'Dec', actual: null, baseline: 1 }
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
                      
                      {/* Aktual Progress Bar */}
                      {item.actual !== null ? (
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
                      ) : (
                        <div style={{
                          width: "100%",
                          height: "28px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "4px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#999",
                          fontSize: "9px",
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "2px",
                          border: "1px dashed #ccc"
                        }}>
                          <div style={{ fontSize: "7px", opacity: 0.9 }}>Aktual</div>
                          <div>-</div>
                        </div>
                      )}
                      
                      {/* Baseline Progress Bar */}
                      <div style={{
                        width: "100%",
                        height: "28px",
                        backgroundColor: "#1890ff",
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
                        <div style={{ fontSize: "7px", opacity: 0.9 }}>Baseline</div>
                        <div>{item.baseline}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </Space>
      ),
    },
    {
      key: "gantt-chart",
      label: "Gantt Chart",
      children: (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Top Row - Target vs Aktual dan Info untuk Gantt */}
          <Row gutter={[24, 24]}>
            <Col span={6}>
              <Card 
                style={{ 
                  backgroundColor: "#19315a", 
                  color: "white",
                  textAlign: "center"
                }}
              >
                <Statistic
                  title={<span style={{ color: "white", fontWeight: "bold" }}>TARGET</span>}
                  value="XX"
                  suffix="%"
                  valueStyle={{ color: "white", fontSize: "24px", fontWeight: "bold" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card 
                style={{ 
                  backgroundColor: "#19315a", 
                  color: "white",
                  textAlign: "center"
                }}
              >
                <Statistic
                  title={<span style={{ color: "white", fontWeight: "bold" }}>AKTUAL</span>}
                  value="XX"
                  suffix="%"
                  valueStyle={{ color: "#21426e", fontSize: "24px", fontWeight: "bold" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "8px", fontWeight: "bold" }}>Fase Saat Ini:</div>
                <div style={{ 
                  backgroundColor: "#f0f0f0", 
                  padding: "8px", 
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9"
                }}>
                  Pra-pelaksanaan
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "8px", fontWeight: "bold" }}>Periode:</div>
                <div style={{ 
                  backgroundColor: "#f0f0f0", 
                  padding: "8px", 
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9"
                }}>
                  [dd-mm-yyyy] – [dd-mm-yyyy]
                </div>
              </Card>
            </Col>
          </Row>

          {/* Integrated Gantt Chart */}
          <Section 
            style={{ 
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e8e8e8"
            }}
          >
            {/* Timeline Header */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "300px 1fr", 
              gap: "16px",
              marginBottom: "16px"
            }}>
              <div style={{ 
                fontWeight: "bold", 
                fontSize: "14px",
                color: "#000"
              }}>
                Task Information
              </div>
              <div style={{ 
                fontWeight: "bold", 
                fontSize: "14px",
                color: "#000"
              }}>
                Timeline (2024-2026)
              </div>
            </div>

            {/* Month and Year Headers */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "300px 1fr", 
              gap: "16px",
              marginBottom: "8px"
            }}>
              <div></div>
              <div>
                {/* Month Headers */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(24, 1fr)", 
                  gap: "1px",
                  fontSize: "10px",
                  textAlign: "center",
                  marginBottom: "4px"
                }}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => (
                    <div key={idx} style={{ 
                      padding: "2px 1px",
                      color: "#666"
                    }}>
                      {month}
                    </div>
                  ))}
                </div>
                
                {/* Year Headers */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(24, 1fr)", 
                  gap: "1px",
                  fontSize: "10px",
                  textAlign: "center"
                }}>
                  {['24', '24', '24', '24', '24', '24', '24', '24', '24', '24', '24', '24',
                    '25', '25', '25', '25', '25', '25', '25', '25', '25', '25', '25', '25'].map((year, idx) => (
                    <div key={idx} style={{ 
                      padding: "2px 1px",
                      color: "#666"
                    }}>
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Integrated Task Rows */}
            <div style={{ marginTop: "16px" }}>
              {ganttData.map((task, idx) => (
                <div key={task.key} style={{ 
                  display: "grid", 
                  gridTemplateColumns: "300px 1fr", 
                  gap: "16px",
                  alignItems: "center",
                  marginBottom: "16px",
                  padding: "12px",
                  backgroundColor: "#fafafa",
                  borderRadius: "6px",
                  border: "1px solid #e8e8e8"
                }}>
                  {/* Left Side - Task Info */}
                  <div>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "8px",
                      marginBottom: "8px"
                    }}>
                      <Progress percent={task.complete} size="small" style={{ width: "60px" }} />
                      <span style={{ fontSize: "12px", fontWeight: "bold" }}>{task.wbs}</span>
                      {task.status}
                    </div>
                    <div style={{ 
                      fontSize: "14px", 
                      fontWeight: "bold",
                      marginBottom: "4px",
                      color: "#1890ff"
                    }}>
                      {task.taskName}
                    </div>
                    <div style={{ 
                      fontSize: "11px", 
                      color: "#666",
                      lineHeight: "1.4"
                    }}>
                      <div><strong>WBS:</strong> {task.wbs} | <strong>Baseline:</strong> {task.baselineStart} - {task.baselineFinish} ({task.baselineDuration})</div>
                      <div><strong>Work:</strong> 353 hrs / 353 hrs | <strong>Resources:</strong> {task.resourceNames}</div>
                    </div>
                  </div>

                  {/* Right Side - Timeline Bar */}
                  <div style={{ position: "relative", height: "40px" }}>
                    {/* Background Grid */}
                    <div style={{ 
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      gridTemplateColumns: "repeat(24, 1fr)",
                      gap: "1px"
                    }}>
                      {Array.from({ length: 24 }, (_, i) => (
                        <div key={i} style={{ 
                          backgroundColor: "#f0f0f0",
                          border: "1px solid #e0e0e0"
                        }} />
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div style={{ 
                      position: "absolute",
                      left: `${idx === 0 ? 0 : (idx * 8)}%`, // Different start positions
                      width: `${idx === 0 ? 100 : (idx === 8 ? 15 : 25)}%`, // Different durations
                      height: "24px",
                      backgroundColor: task.complete === 100 ? "#1890ff" : "#52c41a",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      color: "white",
                      fontWeight: "bold",
                      top: "50%",
                      transform: "translateY(-50%)"
                    }}>
                      {task.complete === 100 ? "100%" : `${task.complete}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </Space>
      ),
    },
  ];

  return (
    <Tabs
      type="bordered-card"
      defaultActiveKey="realisasi-cost"
      items={visualizationTabs}
      className="project-detail-visualization-tabs"
    />
  );
};

export default DataVisualizationContent;
