import { Page, Section } from "admiral";
import { Space, Button, Descriptions, Flex, message, Tag, Modal } from "antd";
import { generatePath, Link, useNavigate } from "react-router";
import { Typography } from "antd";
import { useParams } from "react-router";

import { formatDate } from "@/utils/date-format";
import { useGetData } from "@/app/_hooks/use-get-data";
import { messagingDetail } from "../_data";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(messagingDetail(params.id));

  const breadcrumbs = [
    {
      label: "Messaging",
      path: "/messaging",
    },
    {
      label: `Message Details: ${data?.data?.subject || ""}`,
      path: "#",
    },
  ];

  const items = [
    {
      key: "subject",
      label: "Subject",
      children: <Typography.Text strong>{data?.data?.subject ?? "-"}</Typography.Text>,
    },
    {
      key: "to",
      label: "To",
      children: (
        <Typography.Text strong>
          {data?.data?.to?.length > 0 ? data.data.to.join(", ") : "-"}
        </Typography.Text>
      ),
    },
    {
      key: "cc",
      label: "CC",
      children: (
        <Typography.Text strong>
          {data?.data?.cc?.length > 0 ? data.data.cc.join(", ") : "-"}
        </Typography.Text>
      ),
    },
    {
      key: "via",
      label: "Via",
      children: (
        data?.data?.via === "Keduanya" ? (
          <>
            <Tag color="orange" style={{ border: 'none' }}>Apps</Tag>
            <Tag color="green" style={{ border: 'none' }}>Email</Tag>
          </>
        ) : (
          <Tag color={
            data?.data?.via === "Email" ? "green" : 
            data?.data?.via === "Apps" ? "orange" : "blue"
          } style={{ border: 'none' }}>
            {data?.data?.via ?? "-"}
          </Tag>
        )
      ),
    },
    {
      key: "template_used",
      label: "Template Used",
      children: (
        <Typography.Text strong>{data?.data?.template_used ?? "None"}</Typography.Text>
      ),
    },
    {
      key: "status",
      label: "Status",
      children: (
        <Tag color={data?.data?.status === "Sent" ? "green" : "orange"} style={{ border: 'none' }}>
          {data?.data?.status ?? "-"}
        </Tag>
      ),
    },
    {
      key: "created_at",
      label: "Created At",
      children: (
        <Typography.Text strong>{formatDate(data?.data?.created_at) ?? "-"}</Typography.Text>
      ),
    },
    {
      key: "updated_at",
      label: "Updated At",
      children: (
        <Typography.Text strong>{formatDate(data?.data?.updated_at) ?? "-"}</Typography.Text>
      ),
    },
  ];

  return (
    <Page
      topActions={
        <Flex gap={10}>
          <Button
            htmlType="button"
            onClick={() => {
              Modal.confirm({
                title: 'Delete Message',
                content: 'Are you sure you want to delete this message?',
                okText: 'Delete',
                cancelText: 'Cancel',
                okType: 'danger',
                onOk() {
                  message.success("Message successfully deleted");
                  navigate("/messaging");
                },
              });
            }}
            danger
          >
            Delete
          </Button>
          <Link
            to={generatePath("/messaging/:id/update", {
              id: params.id,
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title={`Message Details: ${data?.data?.subject || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/messaging")}
      noStyle
    >
      <Section loading={loading}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Section title="Message Information">
            <Descriptions
              bordered
              layout="horizontal"
              items={items}
              column={{
                md: 1,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
            />
          </Section>

          <Section title="Message Content">
            <div style={{ 
              border: '1px solid #d9d9d9', 
              borderRadius: '6px', 
              padding: '16px',
              backgroundColor: '#fafafa',
              minHeight: '200px'
            }}>
              <Typography.Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>
                HTML Preview:
              </Typography.Text>
              <div 
                style={{ 
                  backgroundColor: 'white', 
                  padding: '16px', 
                  borderRadius: '4px',
                  border: '1px solid #e8e8e8'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: data?.data?.body || '<p style="color: #999;">No content available</p>' 
                }}
              />
              
              <Typography.Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '16px', marginBottom: '8px' }}>
                Raw HTML Code:
              </Typography.Text>
              <div style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '12px', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                maxHeight: '200px',
                overflow: 'auto',
                border: '1px solid #e8e8e8'
              }}>
                {data?.data?.body || 'No content available'}
              </div>
            </div>
          </Section>
        </Space>
      </Section>
    </Page>
  );
};

export default Component;
