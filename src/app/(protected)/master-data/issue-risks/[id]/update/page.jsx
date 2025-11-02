import { Page } from "admiral";
import { message } from "antd";
import { generatePath, useNavigate } from "react-router";
import { useParams } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { FormIssueRisk } from "@protected/master-data/issue-risks/_components/Form";
import { issueRiskDetail } from "../../_data";

export const Component = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { data, loading } = useGetData(issueRiskDetail(params.id));

  const handleOnFinish = () => {
    navigate("/master-data/issue-risks");
    message.success("Issue/Risk successfully updated");
  };

  const breadcrumb = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Issue",
      path: "/master-data/issue-risks",
    },
    {
      label: `Issue Details: ${data?.data?.kode_issue_risk ?? "-"} - ${data?.data?.tipe_issue_risk ?? "-"}`,
      path: generatePath("/master-data/issue-risks/:id", { id: params.id }),
    },
    {
      label: `Update Issue: ${data?.data?.kode_issue_risk ?? "-"} - ${data?.data?.tipe_issue_risk ?? "-"}`,
      path: "#",
    },
  ];

  const initialValues = {
    kode_issue_risk: data?.data?.kode_issue_risk,
    tipe_issue_risk: data?.data?.tipe_issue_risk,
    status: data?.data?.status,
  };

  return (
    <Page
      title={`Update Issue: ${data?.data?.kode_issue_risk} - ${data?.data?.tipe_issue_risk}`}
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/master-data/issue-risks")}
    >
      <FormIssueRisk
        isEdit
        key={data?.data?.id}
        formProps={{
          onFinish: handleOnFinish,
          initialValues,
          disabled: loading,
        }}
        error={null}
        loading={loading}
      />
    </Page>
  );
};

export default Component;
