import { Page } from "admiral";
import { message } from "antd";
import { generatePath, useNavigate } from "react-router";
import { useParams } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { FormPerusahaan } from "@protected/master-data/perusahaans/_components/Form";
import { perusahaanDetail } from "../../_data";

export const Component = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { data, loading } = useGetData(perusahaanDetail(params.id));

  const handleOnFinish = () => {
    navigate("/master-data/perusahaans");
    message.success("Perusahaan successfully updated");
  };

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
      label: data?.data?.nama_perusahaan ?? "-",
      path: generatePath("/master-data/perusahaans/:id", { id: params.id }),
    },
    {
      label: `Update Perusahaan: ${data?.data?.nama_perusahaan}`,
      path: "#",
    },
  ];

  const initialValues = {
    nama_perusahaan: data?.data?.nama_perusahaan,
    alamat_perusahaan: data?.data?.alamat_perusahaan,
    email: data?.data?.email,
    no_telepon: data?.data?.no_telepon,
    status: data?.data?.status,
  };

  return (
    <Page
      title={`Update Perusahaan: ${data?.data?.nama_perusahaan}`}
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/master-data/perusahaans")}
    >
      <FormPerusahaan
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
