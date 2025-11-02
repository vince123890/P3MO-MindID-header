import { Page } from "admiral";
import { message } from "antd";
import { generatePath, useNavigate } from "react-router";
import { useParams } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { FormMessaging } from "@protected/messaging/_components/Form";
import { messagingDetail } from "../../_data";

export const Component = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { data, loading } = useGetData(messagingDetail(params.id));

  const handleOnFinish = () => {
    navigate("/messaging");
    message.success("Message successfully updated");
  };

  const breadcrumb = [
    {
      label: "Messaging",
      path: "/messaging",
    },
    {
      label: `Message Details: ${data?.data?.subject ?? "-"}`,
      path: generatePath("/messaging/:id", { id: params.id }),
    },
    {
      label: `Edit Message: ${data?.data?.subject}`,
      path: "#",
    },
  ];

  const initialValues = {
    subject: data?.data?.subject,
    to: data?.data?.to,
    cc: data?.data?.cc,
    via: data?.data?.via,
    body: data?.data?.body,
    template_id: null, // Don't pre-select template in edit mode
  };

  return (
    <Page
      title={`Edit Message: ${data?.data?.subject}`}
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/messaging")}
    >
      <FormMessaging
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
