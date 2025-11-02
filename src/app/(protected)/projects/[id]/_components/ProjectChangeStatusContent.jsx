import { Space, Typography, Flex } from "antd";
import { Section, DataTable } from "admiral";
import dayjs from "dayjs";
import { makeSource } from "@/utils/data-table";
import { useGetData } from "@/app/_hooks/use-get-data";
import { getProjectChangeStatus } from "@/app/(protected)/projects/_data/change-status.js";

const { Text } = Typography;

const ProjectChangeStatusContent = ({ id, filters }) => {
  // Data fetching
  const changeStatusData = useGetData(getProjectChangeStatus(id));

  // Safe filter value extraction with error handling
  const getSearchValue = () => {
    try {
      if (!filters) return "";
      if (typeof filters.search === 'string') return filters.search;
      if (filters.search && typeof filters.search.toString === 'function') {
        return filters.search.toString();
      }
      return "";
    } catch (error) {
      console.warn("Error extracting search value:", error);
      return "";
    }
  };

  // Change Status table columns
  const changeStatusColumns = [
    {
      dataIndex: "date_changes",
      key: "date_changes",
      title: "Date Changes",
      sorter: true,
      width: 180,
      render: (date) => date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "-",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
      sorter: true,
      width: 200,
    },
    {
      dataIndex: "reason_for_change",
      key: "reason_for_change",
      title: "Reason For Change",
      sorter: true,
      ellipsis: true,
      width: 600,
    },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Change Status List with Title */}
      <Section bodyStyle={{ padding: 24 }}>
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Text strong style={{ fontSize: '16px' }}>Change Status</Text>
        </Flex>
      </Section>
      
      <Section bodyStyle={{ padding: 0 }} bordered={false}>
        <DataTable
          rowKey="id"
          loading={changeStatusData.loading}
          source={makeSource(changeStatusData.data)}
          columns={changeStatusColumns}
          search={getSearchValue()}
          hideSearch
          showRowSelection={false}
          scroll={{ x: 980 }}
          pagination={{
            sticky: true,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Section>
    </Space>
  );
};

export default ProjectChangeStatusContent;
