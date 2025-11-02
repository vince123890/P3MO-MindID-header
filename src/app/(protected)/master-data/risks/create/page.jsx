import { Page } from "admiral";
import { message } from "antd";
import { useNavigate } from "react-router";

import RiskForm from "../_components/Form";

export const Component = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    message.success("Resiko created successfully");
    navigate("/master-data/risks");
  };

  const handleCancel = () => {
    navigate("/master-data/risks");
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
      label: "Tambah Resiko",
      path: "#",
    },
  ];

  return (
    <Page
      title="Tambah Resiko"
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/master-data/risks")}
      noStyle
    >
      <RiskForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialValues={{ status: true }}
      />
    </Page>
  );
};

export default Component;
