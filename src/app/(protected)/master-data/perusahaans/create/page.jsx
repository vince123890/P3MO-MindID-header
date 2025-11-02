import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormPerusahaan } from "@protected/master-data/perusahaans/_components/Form";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Perusahaan",
      path: "/master-data/perusahaans",
    },
    {
      label: "Tambah Perusahaan",
      path: "#",
    },
  ];

  const handleOnFinish = () => {
    message.success("Perusahaan successfully created");
    navigate("/master-data/perusahaans");
  };

  return (
    <Page
      title="Tambah Perusahaan"
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/master-data/perusahaans")}
    >
      <FormPerusahaan formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
    </Page>
  );
};

export default Component;
