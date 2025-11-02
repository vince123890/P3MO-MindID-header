import { Page } from "admiral";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";

import IssueForm from "../../_components/Form";
import { useGetData } from "@/app/_hooks/use-get-data";
import { issueDetail } from "../../_data";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(() => issueDetail(params.id));

  const handleSubmit = (values) => {
    message.success("Issue updated successfully");
    navigate(`/master-data/issues/${params.id}`);
  };

  const handleCancel = () => {
    navigate(`/master-data/issues/${params.id}`);
  };

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
      label: `Issue Details: ${data?.kode_issue || ""} - ${data?.tipe_issue || ""}`,
      path: `/master-data/issues/${params.id}`,
    },
    {
      label: "Update Issue",
      path: "#",
    },
  ];

  return (
    <Page
      title={`Update Issue: ${data?.kode_issue || ""} - ${data?.tipe_issue || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate(`/master-data/issues/${params.id}`)}
      noStyle
    >
      <IssueForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialValues={data}
        loading={loading}
      />
    </Page>
  );
};

export default Component;
