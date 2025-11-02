import { Page } from "admiral";
import { message } from "antd";
import { generatePath, useNavigate } from "react-router";
import { useParams } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { formatStringToDate } from "@/utils/date-format";
import { FormKurs } from "@protected/master-data/kurs/_components/Form";
import { kursDetail } from "../../_data";

export const Component = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { data, loading } = useGetData(kursDetail(params.id));

  const handleOnFinish = () => {
    navigate("/master-data/kurs");
    message.success("Kurs successfully updated");
  };

  const breadcrumb = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Kurs",
      path: "/master-data/kurs",
    },
    {
      label: `Kurs Details: USD 1 = IDR ${data?.data?.nilai_kurs ?? "-"}`,
      path: generatePath("/master-data/kurs/:id", { id: params.id }),
    },
    {
      label: `Update Kurs: USD 1 = IDR ${data?.data?.nilai_kurs}`,
      path: "#",
    },
  ];

  const initialValues = {
    nilai_kurs: data?.data?.nilai_kurs,
    tanggal: formatStringToDate(data?.data?.tanggal),
    status: data?.data?.status === "Active",
  };

  return (
    <Page
      title={`Update Kurs: USD 1 = IDR ${data?.data?.nilai_kurs}`}
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/master-data/kurs")}
    >
      <FormKurs
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
