import { Page } from "admiral";
import ReportForm from "./_components/ReportForm";

export const Component = () => {
  const breadcrumbs = [
    {
      label: "Laporan",
      path: "/laporan",
    },
  ];

  return (
    <Page
      title="Laporan"
      breadcrumbs={breadcrumbs}
      noStyle
    >
      <ReportForm />
    </Page>
  );
};

export default Component;
