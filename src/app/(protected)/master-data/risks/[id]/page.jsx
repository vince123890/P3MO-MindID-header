import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { issueRiskDetail } from "../../issue-risks/_data";
import { getRiskDetailItems } from "../_components/RiskDetailItems";
import { RiskDetailActions } from "../_components/RiskActions";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(issueRiskDetail(params.id));

  const breadcrumbs = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Resiko",
      path: "/master-data/risks",
    },
    {
      label: `Resiko Details: ${data?.data?.kode_issue_risk || ""} - ${data?.data?.tipe_issue_risk || ""}`,
      path: "#",
    },
  ];

  const items = getRiskDetailItems(data);

  return (
    <Page
      topActions={
        <RiskDetailActions 
          id={params.id} 
          onDelete={() => navigate("/master-data/risks")} 
        />
      }
      title={`Resiko Details: ${data?.data?.kode_issue_risk || ""} - ${data?.data?.tipe_issue_risk || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/master-data/risks")}
      noStyle
    >
      <Section loading={loading}>
        <Section title="Resiko Information">
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
