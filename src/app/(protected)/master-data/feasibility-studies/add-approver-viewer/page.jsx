import { Page } from "admiral";
import { message } from "antd";
import { useNavigate } from "react-router";
import { ApproverViewerForm } from "../_components/ApproverViewerForm";

export const Component = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    message.success("Approver & Viewer added successfully");
    navigate("/master-data/feasibility-studies");
  };

  const breadcrumbs = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Feasibility Studies",
      path: "/master-data/feasibility-studies",
    },
    {
      label: "Tambah Approver & Viewer",
      path: "#",
    },
  ];

  return (
    <Page
      title="Tambah Approver & Viewer"
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/master-data/feasibility-studies")}
      noStyle
    >
      <ApproverViewerForm
        formProps={{
          onFinish: handleSubmit,
        }}
        loading={false}
        isEdit={false}
        feasibilityStudyId={null}
      />
    </Page>
  );
};

export default Component;
