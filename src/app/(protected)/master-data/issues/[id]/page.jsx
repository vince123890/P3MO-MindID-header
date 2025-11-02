import { Page, Section } from "admiral";
import { Descriptions } from "antd";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { issueDetail } from "../_data";
import { getIssueDetailItems } from "../_components/IssueDetailItems";
import { IssueDetailActions } from "../_components/IssueActions";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(() => issueDetail(params.id));

  const issueData = data?.data || {};
  const breadcrumbs = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Issues",
      path: "/master-data/issues",
    },
    {
      label: `Issue Details: ${issueData.kode_issue || ""} - ${issueData.tipe_issue || ""}`,
      path: "#",
    },
  ];

  const items = getIssueDetailItems(issueData);

  return (
    <Page
      topActions={
        <IssueDetailActions 
          id={params.id} 
          onDelete={() => navigate("/master-data/issues")} 
        />
      }
      title={`Issue Details: ${issueData.kode_issue || ""} - ${issueData.tipe_issue || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/master-data/issues")}
      noStyle
    >
      <Section loading={loading}>
        <Section title="Issue Information">
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
