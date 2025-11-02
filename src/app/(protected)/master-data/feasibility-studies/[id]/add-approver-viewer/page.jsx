import { Page } from "admiral";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { ApproverViewerForm } from "../../_components/ApproverViewerForm";
import { listFeasibilityStudies } from "../../_data";

export const Component = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const feasibilityStudy = listFeasibilityStudies.data.items.find(
    (item) => item.id === parseInt(id)
  );

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    message.success("Approver & Viewer added successfully");
    navigate(`/master-data/feasibility-studies/${id}`);
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
      label: feasibilityStudy?.investment_name || "Detail",
      path: `/master-data/feasibility-studies/${id}`,
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
      goBack={() => navigate(`/master-data/feasibility-studies/${id}`)}
      noStyle
    >
      <ApproverViewerForm
        formProps={{
          onFinish: handleSubmit,
          initialValues: {
            perusahaan: feasibilityStudy?.company || "",
          },
        }}
        loading={false}
        isEdit={false}
        feasibilityStudyId={id}
      />
    </Page>
  );
};

export default Component;
