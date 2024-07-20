import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { ConfigContext } from '../context/ConfigContext';

const ItemPage = () => {
  const authToken = localStorage.getItem('authToken');
  const {baseUrl} = useContext(ConfigContext);
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(`${baseUrl}/item`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
      });
      setItemsData(data);
      dispatch({ type: "HIDE_LOADING" });
      // console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };
  useEffect(() => {
    getAllItems();
  }, []);

  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.delete(`${baseUrl}/item/${record._id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
      });
      message.success("Item Deleted Succesfully");
      getAllItems();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios({
            method: 'post',
            url: `${baseUrl}/item`,
            data: value,
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        message.success("Item Added Succesfully");
        getAllItems();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios({
          method: 'put',
          url: `${baseUrl}/item/${editItem._id}`,
          data: value,
          headers: {
              Authorization: `Bearer ${authToken}`
          }
        });
        message.success("Item Updated Succesfully");
        getAllItems();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
        console.log(error);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setPopupModal(true)}>
          Add Item
        </Button>
      </div>

      <Table columns={columns} dataSource={itemsData} bordered />

      {popupModal && (
        <Modal
          title={`${editItem !== null ? "Edit Item " : "Add New Item"}`}
          visible={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter a name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter a price" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="image"
              label="Image URL"
              rules={[{ required: true, message: "Please enter an image URL" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select>
                <Select.Option value="Hot Drinks">Hot Drinks</Select.Option>
                <Select.Option value="Cold Drinks">Cold Drinks</Select.Option>
                <Select.Option value="Rice">Rice</Select.Option>
                <Select.Option value="Noodles">Noodles</Select.Option>
                <Select.Option value="Meat">Meat</Select.Option>
                <Select.Option value="Seafood">Seafood</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemPage;