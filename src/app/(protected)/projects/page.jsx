import { useMemo } from "react";
import { Tag } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { useGetData } from "@/app/_hooks/use-get-data";
import { allProjects } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allProjectsData = useGetData(allProjects);

  // Generate search suggestions from project data
  const searchOptions = useMemo(() => {
    if (!filters.search || filters.search.length < 1 || !allProjectsData.data?.data?.items) {
      return [];
    }

    const items = allProjectsData.data.data.items;
    const suggestions = [];

    items.forEach((project) => {
      // Match project code
      if (project.project_code?.toLowerCase().includes(filters.search.toLowerCase())) {
        suggestions.push({
          value: project.project_code,
          label: (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span><strong>Code:</strong> {project.project_code}</span>
              <span style={{ color: "#999", fontSize: "12px" }}>{project.company}</span>
            </div>
          ),
        });
      }

      // Match business initiative name
      if (project.business_initiative_name?.toLowerCase().includes(filters.search.toLowerCase())) {
        suggestions.push({
          value: project.business_initiative_name,
          label: (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span><strong>Initiative:</strong> {project.business_initiative_name}</span>
              <span style={{ color: "#999", fontSize: "12px" }}>{project.project_code}</span>
            </div>
          ),
        });
      }
    });

    // Remove duplicates and limit to 10 suggestions
    return suggestions.slice(0, 10);
  }, [filters.search, allProjectsData.data]);

  // Status tag colors
  const getStatusColor = (status) => {
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

  // Project List Columns
  const projectColumns = [
    {
      dataIndex: "project_code",
      key: "project_code",
      title: "Project Code",
      sorter: true,
      render: (_, record) => (
        <Link to={`/projects/${record.id}`}>
          <u>{record.project_code}</u>
        </Link>
      ),
    },
    {
      dataIndex: "business_initiative_name",
      title: "Project Name",
      key: "business_initiative_name",
      sorter: true,
      width: 300,
      ellipsis: true,
    },
    {
      dataIndex: "company",
      title: "Company",
      key: "company",
      sorter: true,
    },
    {
      dataIndex: "status_indicator",
      title: "Status Indicator",
      key: "status_indicator",
      sorter: true,
      render: (status_indicator) => {
        const color = status_indicator === "On Track" ? "green" : 
                     status_indicator === "At Risk" ? "orange" : 
                     status_indicator === "Off Track" ? "red" : "default";
        return (
          <Tag color={color} bordered={false}>
            {status_indicator || "Unknown"}
          </Tag>
        );
      },
    },
    {
      dataIndex: "status",
      title: "Workflow Status",
      key: "status",
      sorter: true,
      render: (status) => (
        <Tag color={getStatusColor(status)} bordered={false}>
          {status}
        </Tag>
      ),
    },
    {
      dataIndex: "days_remaining_till_cod",
      title: "Days Remaining till COD",
      key: "days_remaining_till_cod",
      sorter: true,
      render: (days) => {
        if (days === null || days === undefined) return "-";
        const color = days > 90 ? "green" : days > 30 ? "orange" : "red";
        return (
          <Tag color={color} bordered={false}>
            {days} days
          </Tag>
        );
      },
    },
  ];


  const breadcrumbs = [
    {
      label: "PIMS",
      path: "/projects",
    },
  ];

  return (
    <Page
      title="PIMS"
      breadcrumbs={breadcrumbs}
      noStyle
    >
      <DataTable
        onChange={handleChange}
        rowKey="id"
        loading={allProjectsData.loading}
        source={makeSource(allProjectsData.data)}
        columns={projectColumns}
        showRowSelection={false}
        search={filters.search}
        searchOptions={searchOptions}
        filterComponents={[
          {
            label: "Status",
            name: "status",
            type: "Select",
            placeholder: "Select Status",
            width: 140,
            defaultValue: filters.status,
            options: [
              { label: "Active", value: "Active" },
              { label: "Pending", value: "Pending" },
              { label: "Completed", value: "Completed" },
              { label: "Cancelled", value: "Cancelled" },
            ],
          },
        ]}
      />
    </Page>
  );
};

export default Component;
