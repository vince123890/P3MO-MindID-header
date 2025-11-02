import { Page } from "admiral";
import { message } from "antd";
import { generatePath, useNavigate } from "react-router";
import { useParams } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { FormTemplateMessaging } from "@protected/master-data/template-messaging/_components/Form";
import { templateMessagingDetail } from "../../_data";

export const Component = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { data, loading } = useGetData(templateMessagingDetail(params.id));

  const handleOnFinish = () => {
    navigate("/master-data/template-messaging");
    message.success("Template Messaging successfully updated");
  };

  const breadcrumb = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Template Messaging",
      path: "/master-data/template-messaging",
    },
    {
      label: `Template Details: ${data?.data?.nama_template ?? "-"}`,
      path: generatePath("/master-data/template-messaging/:id", { id: params.id }),
    },
    {
      label: `Update Template: ${data?.data?.nama_template}`,
      path: "#",
    },
  ];

  const initialValues = {
    nama_template: data?.data?.nama_template,
    category: data?.data?.category,
    trigger: data?.data?.trigger,
    body: data?.data?.body,
    status: data?.data?.status,
  };

  return (
    <Page
      title={`Update Template: ${data?.data?.nama_template}`}
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/master-data/template-messaging")}
    >
      <FormTemplateMessaging
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
