import { Button, Flex, message, Tag } from "antd";
import { EyeOutlined, UserAddOutlined, ReloadOutlined, FilterOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";
import dayjs from "dayjs";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { useGetData } from "@/app/_hooks/use-get-data";
import { formatDate } from "@/utils/date-format";
import { listFeasibilityStudies } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const feasibilityStudiesData = useGetData(listFeasibilityStudies);

  const handleSync = () => {
    message.success("Data has been synchronized successfully");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Assign":
        return "green";
      case "Unassign":
        return "orange";
      default:
        return "default";
    }
  };

  const feasibilityStudiesColumns = [
    {
      dataIndex: "project_code",
      key: "project_code",
      title: "Project Code",
      sorter: true,
      render: (_, record) => (
        <Link to={urlParser("/master-data/feasibility-studies/:id", { id: record.id })}>
          <u>{record.project_code}</u>
        </Link>
      ),
    },
    {
      dataIndex: "business_initiative_name",
      title: "Business Initiative Name",
      key: "business_initiative_name",
      sorter: true,
    },
    {
      dataIndex: "company",
      title: "Company",
      key: "company",
      sorter: true,
    },
    {
      dataIndex: "capex_estimate",
      title: "CAPEX Estimate",
      key: "capex_estimate",
      sorter: true,
      render: (_, record) => formatCurrency(record.capex_estimate),
    },
    {
      dataIndex: "irr_estimate",
      title: "IRR Estimate",
      key: "irr_estimate",
      sorter: true,
      render: (_, record) => `${record.irr_estimate}%`,
    },
    {
      dataIndex: "npv_estimate",
      title: "NPV Estimate",
      key: "npv_estimate",
      sorter: true,
      render: (_, record) => formatCurrency(record.npv_estimate),
    },
    {
      dataIndex: "status",
      title: "Status",
      key: "status",
      sorter: true,
      render: (_, record) => (
        <Tag color={getStatusColor(record.status)} style={{ border: 'none' }}>{record.status}</Tag>
      ),
    },
    {
      dataIndex: "last_sync_date",
      title: "Last Sync Date",
      key: "last_sync_date",
      sorter: true,
      render: (_, record) => formatDate(record.last_sync_date),
    },
    {
      dataIndex: "Roles",
      title: "Roles",
      key: "Roles",
      render: (_, record) => {
        if (record.status === "Assign") {
          return "-";
        }
        return (
          <Flex>
            <Link
              to={"/master-data/feasibility-studies/add-approver-viewer"}
            >
              <Button
                type="link"
                icon={<UserAddOutlined style={{ color: "blue" }} />}
              />
            </Link>
          </Flex>
        );
      },
    },
  ];

  const breadcrumbs = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Feasibility Studies",
      path: "/master-data/feasibility-studies",
    },
  ];

  return (
    <Page
      title="Feasibility Studies"
      breadcrumbs={breadcrumbs}
      topActions={
        <Button 
          icon={<ReloadOutlined />} 
          onClick={handleSync}
          type="primary"
        >
          Sync Manual
        </Button>
      }
      noStyle
    >
      <DataTable
        filterComponents={[
          {
            label: "filter",
            name: "filter",
            type: "Group",
            icon: <FilterOutlined />,
            cols: 2,
            filters: [
              {
                label: "Company",
                name: "company",
                type: "Select",
                placeholder: "Select Company",
                defaultValue: filters.company,
                options: [
                  { label: "PT Aneka Tambang Tbk", value: "PT Aneka Tambang Tbk" },
                  { label: "PT Bukit Asam Tbk", value: "PT Bukit Asam Tbk" },
                  { label: "PT Freeport Indonesia", value: "PT Freeport Indonesia" },
                  { label: "PT Indonesia Asahan Aluminium (Inalum)", value: "PT Indonesia Asahan Aluminium (Inalum)" },
                  { label: "PT Timah Tbk", value: "PT Timah Tbk" },
                  { label: "PT Vale Indonesia", value: "PT Vale Indonesia" },
                ],
              },
              {
                label: "Status",
                name: "status",
                type: "Select",
                placeholder: "Select Status",
                defaultValue: filters.status,
                options: [
                  { label: "Assign", value: "Assign" },
                  { label: "Unassign", value: "Unassign" },
                ],
              },
              {
                label: "Last Sync Date",
                name: "last_sync_date",
                type: "DateRangePicker",
                width: 230,
                defaultValue:
                  typeof filters.last_sync_date?.[0] === "number"
                    ? [dayjs(dayjs.unix(filters.last_sync_date[0])), dayjs(dayjs.unix(filters.last_sync_date[1]))]
                    : [undefined, undefined],
                placeholder: ["Start Date", "End Date"],
              },
            ],
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={feasibilityStudiesData.loading}
        source={makeSource(feasibilityStudiesData.data)}
        columns={feasibilityStudiesColumns}
        search={filters.search}
        showRowSelection={false}
      />
    </Page>
  );
};

export default Component;
