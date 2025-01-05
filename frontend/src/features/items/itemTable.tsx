import React, { useEffect } from "react";
import { Table, Button, Space, Popconfirm, Spin, Alert, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from "../../store";
import { deleteItem, getItems } from "./itemSlice";
import { Item } from "../../schemes/itemSchema";

interface ItemTableProps {
  onEdit: (item: Item) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ onEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, itemLoading, itemSuccess, itemMessage } = useSelector(
    (state: RootState) => state.items
  );

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteItem(id)).unwrap();

      await dispatch(getItems()).unwrap();

      message.success("Successfully delete the data.");
    } catch (error: unknown) {
      console.error(error);
      message.error("Failed to delete the selected Item.");
    }
  };

  const onRow = (record: Item, index?: number | null) => ({
    style: {
      backgroundColor:
        index !== null && index !== undefined
          ? index % 2 === 0
            ? "#87ceeb"
            : "#a0cfce"
          : "#fff",
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Item, b: Item) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => {
        return (
          <div style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: Item, b: Item) => a.price - b.price,
      render: (text: string) => {
        return `RM${text}`;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: Item, b: Item) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateA - dateB;
      },
      render: (text: string) => {
        return `${new Date(text).toLocaleString()}`;
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a: Item, b: Item) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateA - dateB;
      },
      render: (text: string) => {
        return `${new Date(text).toLocaleString()}`;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Item) => (
        <Space size="middle">
          <Button onClick={() => onEdit(record)}>Edit</Button>

          <Popconfirm
            title="Are you sure want to delete this item?"
            onConfirm={() => handleDelete(record.id!)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (itemLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {itemSuccess ? (
        <Table
          columns={columns}
          dataSource={items}
          rowKey="id"
          style={{ overflowX: "auto" }}
          onRow={onRow}
        />
      ) : (
        <div style={{ margin: "20px" }}>
          <Alert
            message="Error"
            description={itemMessage}
            type="error"
            showIcon
          />
        </div>
      )}
    </>
  );
};

export default ItemTable;
