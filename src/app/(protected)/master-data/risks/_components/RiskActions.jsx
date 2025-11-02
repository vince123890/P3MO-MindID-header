import { Button, Flex, Modal, message } from "antd";
import { generatePath, Link } from "react-router";

export const RiskDetailActions = ({ id, onDelete }) => {
  const handleDelete = () => {
    Modal.confirm({
      title: "Konfirmasi Hapus",
      content: "Apakah Anda yakin ingin menghapus Resiko ini?",
      okText: "Delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk: () => {
        message.success("Resiko successfully deleted");
        if (onDelete) onDelete(id);
      },
    });
  };

  return (
    <Flex gap={10}>
      <Button htmlType="button" onClick={handleDelete} danger>
        Delete
      </Button>
      <Link to={generatePath("/master-data/risks/:id/update", { id })}>
        <Button htmlType="button" type="primary">
          Edit
        </Button>
      </Link>
    </Flex>
  );
};

export const getRiskBatchActions = (onBatchDelete) => [
  {
    key: "delete",
    label: "Delete",
    onClick: (_values, cb) => {
      Modal.confirm({
        title: "Konfirmasi Hapus",
        content: "Apakah Anda yakin ingin menghapus Resiko yang dipilih?",
        okText: "Delete",
        cancelText: "Cancel",
        okType: "danger",
        onOk: () => {
          message.success("Selected risks successfully deleted");
          if (onBatchDelete) onBatchDelete(_values);
          cb.reset();
        },
      });
    },
    danger: true,
  },
];
