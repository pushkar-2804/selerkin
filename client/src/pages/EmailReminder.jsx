import React, { useState } from "react";
import "./EmailReminder.css";
import {
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Table,
  TableBody,
  Checkbox,
} from "@mui/material";
import axios from "axios";

const EmailReminder = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelect = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  const data = [
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
    // Add more data as needed
  ];

  const sendEmail = (email, customerName, product) => {
    axios
      .post("http://localhost:3000/api/emails/", {
        email,
        name: customerName,
        product,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.orderId}>
                  <TableCell>{row.customerId}</TableCell>
                  <TableCell>{row.orderId}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.review}</TableCell>
                  <TableCell
                    onClick={() =>
                      sendEmail(row.email, row.customerName, row.product)
                    }
                  >
                    {row.status}
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(row.orderId)}
                      onChange={() => handleRowSelect(row.orderId)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default EmailReminder;
