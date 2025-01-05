import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, message, Space, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addItem, getItems, updateItem } from "./itemSlice";
import { Item, itemSchema } from "../../schemes/itemSchema";
import { z } from "zod";
import { Rule } from "antd/es/form";

interface ItemFormProps {
  item?: Item | null;
  onResetItem: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, onResetItem }) => {
  const { itemLoading } = useSelector((state: RootState) => state.items);
  const [isEdit, setIsEdit] = useState(false);
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (item) {
      setIsEdit(true);
      setItemPrice(Number(item.price));
      form.setFieldsValue(item);
    } else {
      setIsEdit(false);
      form.resetFields();
    }
  }, [item, form]);

  const handleResetForm = () => {
    onResetItem();
    setIsEdit(false);
    form.resetFields();
  };

  // Submit the data
  const onFinish = async (item: Item) => {
    try {
      if (isEdit && item) {
        item.price = Number(item.price);
      }

      // Validation
      const validateData = itemSchema.parse(item);

      if (isEdit) {
        await dispatch(updateItem(validateData)).unwrap();
      } else {
        await dispatch(addItem(validateData)).unwrap();
      }

      await dispatch(getItems()).unwrap();

      handleResetForm();

      message.success("Successfully Saved!");
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof z.ZodError) {
        const zodErrors = error.errors.map((err) => ({
          name: err.path,
          errors: [err.message],
        }));
        form.setFields(zodErrors);
      } else {
        message.error(
          "Failed to submit data to the server. An unexpected error occurred."
        );
      }
    }
  };

  const validateDecimalRule: Rule = {
    validator: (_, value) => {
      const numericRegex = /^\d+(\.\d{1,2})?$/;

      if (value && numericRegex.test(value.toString())) {
        return Promise.resolve();
      }

      return Promise.reject(
        new Error("Please enter a valid number with up to two decimal places.")
      );
    },
  };

  const handleItemPriceChange = (input: number | null) => {
    if (input) {
      setItemPrice(input);
    } else {
      form.resetFields(["price"]);
      setItemPrice(0);
    }
  };

  return (
    <>
      {itemLoading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{
            minWidth: 300,
            maxWidth: 500,
            backgroundColor: "#eeeeee",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Form.Item name="id" label="Id" style={{ display: "none" }}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price (RM)"
            rules={[validateDecimalRule]}
          >
            <InputNumber
              type="number"
              value={itemPrice}
              onChange={handleItemPriceChange}
              placeholder="Enter a decimal number"
              step={0.01}
              precision={2}
              style={{ width: "100%" }}
              stringMode
            />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {isEdit ? "Update" : "Add"} Item
            </Button>
            <Button onClick={handleResetForm}>Reset</Button>
          </Space>
        </Form>
      )}
    </>
  );
};
export default ItemForm;
