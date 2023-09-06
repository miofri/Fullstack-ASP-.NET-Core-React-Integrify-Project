// User Management: Admins should be able to view and delete users.
// Product Management: Admins should be able to view, edit, delete and add new products.
// Order Management: Admins should be able to view all orders

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { getAllUserThunk } from "../../../store/thunks/userThunks/getAllUserThunk";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Box, Button, Container, Typography } from "@mui/material";
import { AdminAllUser } from "../../../interface/Users";
import axios from "axios";

export const AdminUserOperationPage = () => {
  const [allUser, setAllUser] = useState<AdminAllUser[]>();
  const [updateUserList, setUpdateUserList] = useState<number>(0);
  const bearerToken = useSelector((state: RootState) => state.auth.bearerToken);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    if (window.confirm(`Delete user with the id ${id}?`)) {
      const deleteUser = async (id: string) => {
        const postConfig = {
          headers: { Authorization: `Bearer ${bearerToken}` },
        };
        const response = await axios.delete(
          `http://localhost:5145/api/v1/users/${id}`,
          postConfig
        );
      };
      deleteUser(id);
      setUpdateUserList(updateUserList + 1);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await dispatch(getAllUserThunk(bearerToken));
      setAllUser(response.payload);
      console.log(allUser);
    };
    getUser();
  }, [updateUserList]);
  if (allUser !== undefined && allUser.length > 0) {
    return (
      <Container maxWidth="md">
        <Box>
          {allUser!.map((user: AdminAllUser) => (
            <>
              <Box sx={{ my: 2 }}>
                <Typography variant="h5">
                  {user.firstName} {user.lastName}
                </Typography>
                <hr />
                ID: {user.id} <br />
                Email: {user.email} <br />
                Address: {user.address}
              </Box>
              <Button onClick={() => handleDelete(user.id)}>Delete user</Button>
            </>
          ))}
        </Box>
      </Container>
    );
  } else {
    return <div>Loading</div>;
  }
};
