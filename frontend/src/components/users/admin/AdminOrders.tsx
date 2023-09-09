// User Management: Admins should be able to view and delete users.
// Product Management: Admins should be able to view, edit, delete and add new products.
// Order Management: Admins should be able to view all orders

import { Container, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Order } from "../../../interface/Orders";
import { useAppDispatch } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { LoggedInHeaderBar } from "../../extras/LoggedInHeaderBar";

export const AdminOrders = () => {
  const [allOrders, setAllOrders] = useState<Order[]>();
  const [updateUserList, setUpdateUserList] = useState<number>(0);
  const bearerToken = useSelector((state: RootState) => state.auth.bearerToken);

  useEffect(() => {
    const getOrders = async () => {
      const postConfig = {
        headers: { Authorization: `Bearer ${bearerToken}` },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/orders`,
        postConfig
      );
      setAllOrders(response.data);
    };
    getOrders();
  }, [updateUserList]);
  if (allOrders !== undefined && allOrders.length > 0) {
    return (
      <Container maxWidth="md">
        <LoggedInHeaderBar />
        <Box sx={{ marginTop: 15 }}>
          {allOrders!.map((order: Order) => (
            <Box key={order.id} sx={{ my: 2 }}>
              <Typography variant="h5">Order ID: {order.id}</Typography>
              <hr />
              User ID: {order.userId} <br />
              Status: {order.status} <br />
            </Box>
          ))}
        </Box>
      </Container>
    );
  } else {
    return <div>Loading</div>;
  }
};
