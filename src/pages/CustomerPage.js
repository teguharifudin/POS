import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { ConfigContext } from '../context/ConfigContext';

const CutomerPage = () => {
  const authToken = localStorage.getItem('authToken');
  const {baseUrl} = useContext(ConfigContext);
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getAllBills = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get(`${baseUrl}/bill`, {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
        });
        setBillsData(data);
        dispatch({ type: "HIDE_LOADING" });
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllBills();
  }, [dispatch, baseUrl, authToken]);

  const columns = [
    { title: "ID", dataIndex: "_id" },
    { title: "Cutomer Name", dataIndex: "customerName"},
    { title: "Contact No", dataIndex: "customerNumber" },
    { title: "Total Amount", dataIndex: "totalAmount" },
  ];

  return (
    <DefaultLayout>
      <h1>Cutomer Page</h1>
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={false}
      />
    </DefaultLayout>
  );
};

export default CutomerPage;