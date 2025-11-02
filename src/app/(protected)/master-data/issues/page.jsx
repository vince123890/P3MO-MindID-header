import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { useGetData } from "@/app/_hooks/use-get-data";
import { allIssues } from "./_data";
import { getIssueColumns, getIssueActions } from "./_components/IssueColumns";
import { getIssueFilters } from "./_components/IssueFilters";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allIssuesData = useGetData(allIssues);

  const breadcrumbs = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Issues",
      path: "/master-data/issues",
    },
  ];

  return (
    <Page
      title="Issues"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/master-data/issues/create"}>
          <Button type="primary" icon={<PlusOutlined />}>Tambah Issue</Button>
        </Link>
      }
      noStyle
    >
      <DataTable
        filterComponents={getIssueFilters(filters)}
        onChange={handleChange}
        rowKey="id"
        loading={allIssuesData.loading}
        source={makeSource(allIssuesData.data)}
        columns={getIssueColumns(filters)}
        search={filters.search}
        showRowSelection={true}
        batchActionMenus={getIssueActions()}
      />
    </Page>
  );
};

export default Component;
