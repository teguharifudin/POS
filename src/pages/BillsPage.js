import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import DefaultLayout from "../components/DefaultLayout";
import { ConfigContext } from '../context/ConfigContext';
import "../styles/InvoiceStyles.css";
import { AuthContext } from '../context/auth.context'

const BillsPage = () => {
  const authToken = localStorage.getItem('authToken');
  const {baseUrl} = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

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
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const columns = [
    { title: "ID ", dataIndex: "_id" },
    {
      title: "Cutomer Name",
      dataIndex: "customerName",
    },
    { title: "Contact No", dataIndex: "customerNumber" },
    { title: "Subtotal", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice list</h1>
      </div>

      <Table columns={columns} dataSource={billsData} bordered />

      {popupModal && (
        <Modal
          width={400}
          pagination={false}
          title="Invoice Details"
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="info">
                <h2>{ user.name }</h2>
                <p> Contact : { user.phone } <br/> { user.address } </p>
              </div>
            </center>
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name: <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No:  <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date:{" "}
                  <b>
                    {new Date(selectedBill.date).toLocaleDateString("en-GB")}
                  </b>
                  <br />
                </p>
                {/* <hr style={{ margin: "5px" }} /> */}
              </div>
            </div>
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item table-header">
                        <p>
                          <b>Item</b>
                        </p>
                      </td>
                      <td className="Hours table-header">
                        <p>
                          <b>Quantity</b>
                        </p>
                      </td>
                      <td className="Rate table-header">
                        <p>
                          <b>Price</b>
                        </p>
                      </td>
                      <td className="Rate table-header">
                        <p>
                          <b>Total</b>
                        </p>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <tr className="service" key={item._id}>
                        <td className="tableitem">
                          <p className="itemtext">{item.name}</p>
                        </td>
                        <td className="tableitem">
                          <p className="itemtext">{item.quantity}</p>
                        </td>
                        <td className="tableitem">
                          <p className="itemtext">{item.price}</p>
                        </td>
                        <td className="tableitem">
                          <p className="itemtext">
                            {item.quantity * item.price}
                          </p>
                        </td>
                      </tr>
                    ))}
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate table-header">
                        <p className="tax-label">Tax</p>
                      </td>
                      <td className="payment">
                        <p className="tax-value">IDR{selectedBill.tax}</p>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate table-header">
                        <p className="grand-total-label"><b>Grand Total</b></p>
                      </td>
                      <td className="payment">
                        <p className="grand-total-value">
                          <b>IDR{selectedBill.totalAmount}</b>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 15% VAT application
                  on total amount. Please note that this is non refundable
                  amount. For any assistance please write email
                  <b> { user.email }</b>
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;