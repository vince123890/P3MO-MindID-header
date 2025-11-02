import { Button, Flex, message, Tag, Modal } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { useGetData } from "@/app/_hooks/use-get-data";
import { formatDate } from "@/utils/date-format";
import { allMessaging } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allMessagingData = useGetData(allMessaging);

  const allMessagingColumns = [
    {
      dataIndex: "subject",
      key: "subject",
      title: "Subject",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>{record.subject}</u>
        </Link>
      ),
    },
    {
      dataIndex: "to",
      title: "To",
      key: "to",
      sorter: false,
      render: (_, record) => {
        const recipients = record.to || [];
        if (recipients.length === 0) return "-";
        
        if (recipients.length === 1) {
          return recipients[0];
        }
        
        if (recipients.length <= 3) {
          return recipients.join(", ");
        }
        
        return `${recipients.slice(0, 2).join(", ")} +${recipients.length - 2} more`;
      },
    },
    {
      dataIndex: "cc",
      title: "CC",
      key: "cc",
      sorter: false,
      render: (_, record) => {
        const ccRecipients = record.cc || [];
        if (ccRecipients.length === 0) return "-";
        
        if (ccRecipients.length === 1) {
          return ccRecipients[0];
        }
        
        if (ccRecipients.length <= 2) {
          return ccRecipients.join(", ");
        }
        
        return `${ccRecipients.slice(0, 1).join(", ")} +${ccRecipients.length - 1} more`;
      },
    },
    {
      dataIndex: "via",
      title: "Via",
      key: "via",
      sorter: true,
      render: (_, record) => {
        if (record.via === "Keduanya") {
          return (
            <>
              <Tag color="orange" style={{ border: 'none' }}>Apps</Tag>
              <Tag color="green" style={{ border: 'none' }}>Email</Tag>
            </>
          );
        }
        
        let color = "blue";
        if (record.via === "Email") color = "green";
        else if (record.via === "Apps") color = "orange";
        
        return <Tag color={color} style={{ border: 'none' }}>{record.via}</Tag>;
      },
    },
    {
      dataIndex: "created_at",
      title: "Created At",
      key: "created_at",
      sorter: true,
      render: (_, record) => {
        return formatDate(record.created_at);
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
              to={urlParser("/messaging/:id/update", {
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
                  title: 'Delete Message',
                  content: 'Are you sure you want to delete this message?',
                  okText: 'Delete',
                  cancelText: 'Cancel',
                  okType: 'danger',
                  onOk() {
                    message.success("Message successfully deleted");
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
      label: "Messaging",
      path: "/messaging",
    },
  ];

  return (
    <Page
      title="Messaging"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/messaging/create"}>
          <Button type="primary" icon={<PlusOutlined />}>Compose Message</Button>
        </Link>
      }
      noStyle
    >
      <DataTable
        filterComponents={[
          {
            label: "Via",
            name: "via",
            type: "Select",
            placeholder: "Select delivery method",
            width: 160,
            defaultValue: filters.via,
            options: [
              { label: "Apps", value: "Apps" },
              { label: "Email", value: "Email" },
              { label: "Keduanya", value: "Keduanya" },
            ],
          },
          {
            label: "Status",
            name: "status",
            type: "Select",
            placeholder: "Select status",
            width: 140,
            defaultValue: filters.status,
            options: [
              { label: "Sent", value: "Sent" },
              { label: "Draft", value: "Draft" },
            ],
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={allMessagingData.loading}
        source={makeSource(allMessagingData.data)}
        columns={allMessagingColumns}
        search={filters.search}
        showRowSelection={true}
        batchActionMenus={[
          {
            key: "delete",
            label: "Delete",
            onClick: (_values, cb) => {
              Modal.confirm({
                title: 'Delete Selected Messages',
                content: 'Are you sure you want to delete the selected messages?',
                okText: 'Delete',
                cancelText: 'Cancel',
                okType: 'danger',
                onOk() {
                  message.success("Selected messages successfully deleted");
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
