import { Button, Flex, message, Tag, Modal } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";
import dayjs from "dayjs";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { useGetData } from "@/app/_hooks/use-get-data";
import { formatDate } from "@/utils/date-format";
import { allPerusahaans } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allPerusahaansData = useGetData(allPerusahaans);

  const allPerusahaanColumns = [
    {
      dataIndex: "nama_perusahaan",
      key: "nama_perusahaan",
      title: "Perusahaan",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>{record.nama_perusahaan}</u>
        </Link>
      ),
    },
    {
      dataIndex: "email",
      title: "Email",
      key: "email",
      sorter: true,
    },
    {
      dataIndex: "no_telepon",
      title: "No Telepon",
      key: "no_telepon",
      sorter: true,
    },
    {
      dataIndex: "status",
      title: "Status",
      key: "status",
      sorter: true,
      render: (_, record) => {
        const color = record.status === "Active" ? "green" : "red";
        return <Tag color={color} style={{ border: 'none' }}>{record.status}</Tag>;
      },
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Link
              to={urlParser("/master-data/perusahaans/:id/update", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EditOutlined />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                Modal.confirm({
                  title: 'Confirm Delete',
                  content: `Are you sure you want to delete ${record.nama_perusahaan}?`,
                  okText: 'Delete',
                  cancelText: 'Cancel',
                  okType: 'danger',
                  onOk() {
                    message.success("Perusahaan successfully deleted");
                  },
                });
              }}
            />
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
      label: "Perusahaan",
      path: "/master-data/perusahaans",
    },
  ];

  return (
    <Page
      title="Perusahaan"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/master-data/perusahaans/create"}>
          <Button type="primary" icon={<PlusOutlined />}>Tambah Perusahaan</Button>
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
          {
            label: "Created Date",
            name: "created_date",
            type: "DateRangePicker",
            width: 230,
            defaultValue:
              typeof filters.created_date?.[0] === "number"
                ? [dayjs(dayjs.unix(filters.created_date[0])), dayjs(dayjs.unix(filters.created_date[1]))]
                : [undefined, undefined],
            placeholder: ["Start", "End"],
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={allPerusahaansData.loading}
        source={makeSource(allPerusahaansData.data)}
        columns={allPerusahaanColumns}
        search={filters.search}
        showRowSelection={true}
        batchActionMenus={[
          {
            key: "delete",
            label: "Delete",
            onClick: (values, cb) => {
              Modal.confirm({
                title: 'Confirm Delete',
                content: `Are you sure you want to delete ${values.length} selected perusahaan?`,
                okText: 'Delete',
                cancelText: 'Cancel',
                okType: 'danger',
                onOk() {
                  message.success("Selected perusahaan successfully deleted");
                  cb.reset();
                },
              });
            },
            danger: true,
            icon: <DeleteOutlined />,
          },
        ]}
      />
    </Page>
  );
};

export default Component;
