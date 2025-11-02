import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormUser } from "@protected/user-management/users/_components/Form";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "User Management",
      path: "/user-management/users",
    },
    {
      label: "Daftar User",
      path: "/user-management/users",
    },
    {
      label: "Tambah User",
      path: "#",
    },
  ];

  const handleOnFinish = (values) => {
    // Simulate creating user
    console.log("Creating user:", values);
    message.success("User successfully created");
    navigate("/user-management/users");
  };

  return (
    <Page
      title="Tambah User"
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/user-management/users")}
    >
      <FormUser formProps={{ onFinish: handleOnFinish }} error={null} loading={false} isEdit={false} />
    </Page>
  );
};

export default Component;
