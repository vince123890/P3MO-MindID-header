import { Page, Section } from "admiral";
import { Button, Descriptions, Flex, Tag } from "antd";
import { generatePath, Link, useNavigate } from "react-router";
import { Typography } from "antd";
import { useParams } from "react-router";

import { formatDate, formatToMonthYear } from "@/utils/date-format";
import { useGetData } from "@/app/_hooks/use-get-data";
import { kursDetail } from "../_data";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(kursDetail(params.id));

  const breadcrumbs = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Kurs",
      path: "/master-data/kurs",
    },
    {
      label: `Kurs Details: USD 1 = IDR ${data?.data?.nilai_kurs || ""}`,
      path: "#",
    },
  ];

  const items = [
    {
      key: "nilai_kurs",
      label: "Nilai Kurs (USD ke IDR)",
      children: <Typography.Text strong>IDR {data?.data?.nilai_kurs ?? "-"}</Typography.Text>,
    },
    {
      key: "tanggal",
      label: "Bulan Tahun",
      children: (
        <Typography.Text strong>{formatToMonthYear(data?.data?.tanggal) ?? "-"}</Typography.Text>
      ),
    },
    {
      key: "status",
      label: "Status",
      children: (
        <Tag color={data?.data?.status === "Active" ? "green" : "red"} style={{ border: 'none' }}>
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
        <Link
          to={generatePath("/master-data/kurs/:id/update", {
            id: params.id,
          })}
        >
          <Button htmlType="button" type="primary">
            Edit
          </Button>
        </Link>
      }
      title={`Kurs Details: USD 1 = IDR ${data?.data?.nilai_kurs || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/master-data/kurs")}
      noStyle
    >
      <Section loading={loading}>
        <Section title="Exchange Rate Information">
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
      </Section>
    </Page>
  );
};

export default Component;
