import React, { useState } from "react";
import "./EmailReminder.css";
import { Audio } from "react-loader-spinner";
import {
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Table,
  TableBody,
  Checkbox,
  Button,
} from "@mui/material";
import axios from "axios";

const EmailReminder = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [emailListData, setEmailListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      customerId: 1,
      customerName: "Pushkar Khare",
      product: "Noise Headphones",
      orderId: 101,
      date: "2023-07-28",
      review: "Great product!",
      status: "Delivered",
      email: "abc@gmail.com",
    },
    {
      customerId: 2,
      product: "Noise smartwatch",
      customerName: "Pushkar Khare2",
      orderId: 102,
      date: "2023-07-27",
      review: "Fast shipping!",
      status: "Delivered",
      email: "abc@gmail.com",
    },
    {
      customerId: 3,
      product: "Noise smartwatch",
      customerName: "Pushkar Khare3",
      orderId: 103,
      date: "2023-07-27",
      review: "",
      status: "Send Now",
      email: "abc@gmail.com",
    },
    {
      customerId: 4,
      product: "Noise smartwatch",
      customerName: "Pushkar Khare4",
      orderId: 104,
      date: "2023-07-27",
      review: "",
      status: "Send Now",
      email: "abc@gmail.com",
    },
  ]);

  const handleRowSelect = (rowId, rowEmail, customerName, product) => {
    if (selectedRows.includes(rowId)) {
      setEmailListData(emailListData.filter((data) => data.email !== rowEmail));
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setEmailListData([
        ...emailListData,
        { rowId, email: rowEmail, customerName, product },
      ]);
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const mailCustomer = async () => {
    console.log("hello");
    setLoading(true);
    const emailPromises = emailListData.map((data) => {
      return sendEmail(data.rowId, data.email, data.customerName, data.product);
    });
    await Promise.all(emailPromises)
      .then(() => {
        setEmailListData([]);
        setSelectedRows([]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const sendEmail = async (id, email, customerName, product) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/emails`,
        {
          email,
          name: customerName,
          product,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.orderId === id ? { ...item, status: "Delivered" } : item
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading && (
        <div className="loaderWrapper">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        </div>
      )}
      <div className="wrapper">
        <div className="heading">Email Reminder</div>
        <div className="emailWrap">
          <TableContainer component={Paper}>
            <Table aria-label="data table">
              <TableHead>
                <TableRow>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Review</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>
                    <Button
                      variant="primary"
                      disabled={selectedRows.length <= 0}
                      sx={{
                        background: "black",
                        color: "white",
                        "&:hover": {
                          background: "white",
                          color: "black",
                        },
                        "&:disabled": {
                          background: "gray",
                          color: "white",
                          cursor: "not-allowed",
                        },
                      }}
                      onClick={mailCustomer}
                    >
                      Send Now
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow key={row.orderId}>
                    <TableCell>{row.customerId}</TableCell>
                    <TableCell>{row.orderId}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      {row.review === "" ? "none" : row.review}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        if (row.review === "") {
                          sendEmail(
                            row.id,
                            row.email,
                            row.customerName,
                            row.product
                          );
                        }
                      }}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(row.orderId)}
                        onChange={() =>
                          handleRowSelect(
                            row.orderId,
                            row.email,
                            row.customerName,
                            row.product
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default EmailReminder;
