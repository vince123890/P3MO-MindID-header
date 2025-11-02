import { Button, Flex, message, Tag, Modal } from "antd";
import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { useGetData } from "@/app/_hooks/use-get-data";
import { allTemplateMessagings } from "./_data";
import { allPerusahaans } from "../perusahaans/_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allTemplateMessagingsData = useGetData(allTemplateMessagings);

  // Get unique companies for filter options
  const companyOptions = allPerusahaans.data.items.map((item) => ({
    label: item.nama_perusahaan,
    value: item.nama_perusahaan,
  }));

  const allTemplateMessagingsColumns = [
    {
      dataIndex: "nama_template",
      key: "nama_template",
      title: "Nama Template",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>{record.nama_template}</u>
        </Link>
      ),
    },
    {
      dataIndex: "status",
      title: "Status",
      key: "status",
      sorter: true,
      width: 120,
      align: "center",
      render: (_, record) => {
        const color = record.status === "Active" ? "green" : "red";
        return <Tag color={color} style={{ border: 'none' }}>{record.status}</Tag>;
      },
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      width: 80,
      align: "center",
      render: (_, record) => {
        return (
          <Link
            to={urlParser("/master-data/template-messaging/:id/update", {
              id: record.id,
            })}
          >
            <Button type="link" icon={<EditOutlined />} />
          </Link>
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
      label: "Template Messaging",
      path: "/master-data/template-messaging",
    },
  ];

  return (
    <Page
      title="Template Messaging"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/master-data/template-messaging/create"}>
          <Button type="primary" icon={<PlusOutlined />}>Tambah Template</Button>
        </Link>
      }
      noStyle
    >
      <DataTable
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
              { label: "Inactive", value: "Inactive" },
            ],
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={allTemplateMessagingsData.loading}
        source={makeSource(allTemplateMessagingsData.data)}
        columns={allTemplateMessagingsColumns}
        search={filters.search}
        showRowSelection={false}
      />
    </Page>
  );
};

export default Component;
