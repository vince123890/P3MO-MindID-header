import { Page } from "admiral";
import { message } from "antd";
import { useNavigate } from "react-router";

import IssueForm from "../_components/Form";

export const Component = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    message.success("Issue created successfully");
    navigate("/master-data/issues");
  };

  const handleCancel = () => {
    navigate("/master-data/issues");
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
      label: "Tambah Issue",
      path: "#",
    },
  ];

  return (
    <Page
      title="Tambah Issue"
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/master-data/issues")}
      noStyle
    >
      <IssueForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialValues={{ status: true, statusOnly: true }}
      />
    </Page>
  );
};

export default Component;
