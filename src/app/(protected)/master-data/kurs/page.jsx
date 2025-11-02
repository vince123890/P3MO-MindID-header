import { Button, message, Tag } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";
import dayjs from "dayjs";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { useGetData } from "@/app/_hooks/use-get-data";
import { formatToMonthYear } from "@/utils/date-format";
import { allKurs } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allKursData = useGetData(allKurs);

  const allKursColumns = [
    {
      dataIndex: "nilai_kurs",
      key: "nilai_kurs",
      title: "Nilai Kurs",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>USD 1 = IDR {record.nilai_kurs}</u>
        </Link>
      ),
    },
    {
      dataIndex: "tanggal",
      title: "Bulan Tahun",
      key: "tanggal",
      sorter: true,
      render: (_, record) => {
        return formatToMonthYear(record.tanggal);
      },
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
          <Link
            to={urlParser("/master-data/kurs/:id/update", {
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
      label: "Kurs",
      path: "/master-data/kurs",
    },
  ];

  return (
    <Page
      title="Kurs"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/master-data/kurs/create"}>
          <Button type="primary" icon={<PlusOutlined />}>Tambah Kurs</Button>
        </Link>
      }
      noStyle
    >
      <DataTable
        onChange={handleChange}
        rowKey="id"
        loading={allKursData.loading}
        source={makeSource(allKursData.data)}
        columns={allKursColumns}
        search={filters.search}
      />
    </Page>
  );
};

export default Component;
