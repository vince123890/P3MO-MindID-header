import { Page } from "admiral";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";

import RiskForm from "../../_components/Form";
import { useGetData } from "@/app/_hooks/use-get-data";
import { issueRiskDetail } from "../../../issue-risks/_data";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(issueRiskDetail(params.id));

  const handleSubmit = (values) => {
    message.success("Resiko updated successfully");
    navigate(`/master-data/risks/${params.id}`);
  };

  const handleCancel = () => {
    navigate(`/master-data/risks/${params.id}`);
  };

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
      path: `/master-data/risks/${params.id}`,
    },
    {
      label: "Update Resiko",
      path: "#",
    },
  ];

  return (
    <Page
      title={`Update Resiko: ${data?.data?.kode_issue_risk || ""} - ${data?.data?.tipe_issue_risk || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate(`/master-data/risks/${params.id}`)}
      noStyle
    >
      <RiskForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialValues={data?.data}
        loading={loading}
      />
    </Page>
  );
};

export default Component;
