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
import { allIssueRisks } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allIssueRisksData = useGetData(allIssueRisks);

  const allIssueRisksColumns = [
    {
      dataIndex: "kode_issue_risk",
      key: "kode_issue_risk",
      title: "Kode Issue",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>{record.kode_issue_risk}</u>
        </Link>
      ),
    },
    {
      dataIndex: "tipe_issue_risk",
      title: "Tipe Issue",
      key: "tipe_issue_risk",
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
              to={urlParser("/master-data/issue-risks/:id/update", {
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
                  title: "Konfirmasi Hapus",
                  content: "Apakah Anda yakin ingin menghapus Issue/Risk ini?",
                  okText: "Delete",
                  cancelText: "Cancel",
                  okType: "danger",
                  onOk: () => {
                    message.success("Issue/Risk successfully deleted");
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
      label: "Issue",
      path: "/master-data/issue-risks",
    },
  ];

  return (
    <Page
      title="Issue"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/master-data/issue-risks/create"}>
          <Button type="primary" icon={<PlusOutlined />}>Tambah Issue</Button>
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
            label: "Tipe",
            name: "tipe_issue_risk",
            type: "Select",
            placeholder: "Select Type",
            width: 180,
            defaultValue: filters.tipe_issue_risk,
            options: [
              { label: "Technical Issue", value: "Technical Risk" },
              { label: "Budget Issue", value: "Budget Risk" },
              { label: "Schedule Issue", value: "Schedule Risk" },
              { label: "Resource Issue", value: "Resource Risk" },
              { label: "Quality Issue", value: "Quality Issue" },
              { label: "Scope Issue", value: "Scope Issue" },
              { label: "Communication Issue", value: "Communication Risk" },
              { label: "Stakeholder Issue", value: "Stakeholder Risk" },
              { label: "External Issue", value: "External Risk" },
              { label: "Compliance Issue", value: "Compliance Issue" },
            ],
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={allIssueRisksData.loading}
        source={makeSource(allIssueRisksData.data)}
        columns={allIssueRisksColumns}
        search={filters.search}
        showRowSelection={true}
        batchActionMenus={[
          {
            key: "delete",
            label: "Delete",
            onClick: (_values, cb) => {
              Modal.confirm({
                title: "Konfirmasi Hapus",
                content: "Apakah Anda yakin ingin menghapus Issue/Risk yang dipilih?",
                okText: "Delete",
                cancelText: "Cancel",
                okType: "danger",
                onOk: () => {
                  message.success("Selected issue/risks successfully deleted");
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
