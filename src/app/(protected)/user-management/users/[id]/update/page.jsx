import { message } from "antd";
import { Page } from "admiral";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { FormUser } from "@protected/user-management/users/_components/Form";
import { detailUser } from "@protected/user-management/_data";

export const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

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
      label: "Edit User",
      path: "#",
    },
  ];

  useEffect(() => {
    const userId = String(id || "");
    const userData = detailUser(userId)?.data || {};
    
    // Set initial values for the form
    const formValues = {
      nip: userData.nip || "",
      nama_user: userData.nama_user || "",
      username: userData.username || "",
      email: userData.email || "",
      perusahaan: userData.perusahaan || "",
      role: userData.role || "",
      jabatan: userData.jabatan || "",
      fungsi: userData.fungsi || "",
      no_hp: userData.no_hp || "",
      status: userData.status === "Active" ? true : false,
    };
    
    setInitialValues(formValues);
    setLoading(false);
  }, [id]);

  const handleOnFinish = (values) => {
    // Simulate updating user
    console.log("Updating user:", values);
    message.success("User successfully updated");
    navigate("/user-management/users");
  };

  return (
    <Page
      title="Edit User"
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/user-management/users")}
    >
      <FormUser 
        formProps={{ 
          onFinish: handleOnFinish,
          initialValues: initialValues
        }} 
        error={null} 
        loading={loading} 
        isEdit={true} 
      />
    </Page>
  );
};

export default Component;
