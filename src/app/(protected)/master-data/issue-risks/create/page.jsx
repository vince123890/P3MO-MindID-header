import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormIssueRisk } from "@protected/master-data/issue-risks/_components/Form";

export const Component = () => {
  const navigate = useNavigate();
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
      label: "Tambah Issue",
      path: "#",
    },
  ];

  const handleOnFinish = (values) => {
    message.success("Issue/Risk successfully created");
    navigate("/master-data/issue-risks");
  };

  return (
    <Page
      title="Tambah Issue"
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/master-data/issue-risks")}
    >
      <FormIssueRisk 
        formProps={{ 
          onFinish: handleOnFinish,
          initialValues: {
            status: "Active"
          }
        }} 
        error={null} 
        loading={false} 
      />
    </Page>
  );
};

export default Component;
