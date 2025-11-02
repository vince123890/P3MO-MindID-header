import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { useGetData } from "@/app/_hooks/use-get-data";
import { allIssueRisks } from "../issue-risks/_data";
import { getRiskColumns } from "./_components/RiskColumns";
import { getRiskFilters } from "./_components/RiskFilters";
import { getRiskBatchActions } from "./_components/RiskActions";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allRisksData = useGetData(allIssueRisks);

  const allRisksColumns = getRiskColumns();

  const breadcrumbs = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Resiko",
      path: "/master-data/risks",
    },
  ];

  return (
    <Page
      title="Resiko"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/master-data/risks/create"}>
          <Button type="primary" icon={<PlusOutlined />}>Tambah Resiko</Button>
        </Link>
      }
      noStyle
    >
      <DataTable
        filterComponents={getRiskFilters(filters)}
        onChange={handleChange}
        rowKey="id"
        loading={allRisksData.loading}
        source={makeSource(allRisksData.data)}
        columns={allRisksColumns}
        search={filters.search}
        showRowSelection={true}
        batchActionMenus={getRiskBatchActions()}
      />
    </Page>
  );
};

export default Component;
