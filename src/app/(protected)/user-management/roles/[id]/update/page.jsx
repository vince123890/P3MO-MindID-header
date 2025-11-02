import { Page } from "admiral";
import { message } from "antd";
import { generatePath, useNavigate } from "react-router";
import { useParams } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import RoleForm from "../../_components/Form";
import { detailRole } from "../../../_data";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(detailRole(params.id));

  const handleOnFinish = () => {
    navigate("/user-management/roles");
    message.success("Role successfully updated");
  };

  const breadcrumb = [
    {
      label: "User Management",
      path: "/user-management",
    },
    {
      label: "Daftar Role",
      path: "/user-management/roles",
    },
    {
      label: "Edit Role",
      path: "#",
    },
  ];

  if (loading) {
    return (
      <Page
        title="Loading..."
        breadcrumbs={breadcrumb}
        noStyle
        goBack={() => navigate("/user-management/roles")}
      >
        <div>Loading...</div>
      </Page>
    );
  }

  const initialValues = {
    nama_role: data?.data?.nama_role,
    status: data?.data?.status === "Active",
    permissions: data?.data?.permissions || {},
  };

  return (
    <Page
      title={`Update Role: ${data?.data?.nama_role ?? "-"}`}
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/user-management/roles")}
    >
      <RoleForm
        isEdit
        key={data?.data?.id}
        initialValues={initialValues}
        onSubmit={handleOnFinish}
        loading={loading}
      />
    </Page>
  );
};

export default Component;
