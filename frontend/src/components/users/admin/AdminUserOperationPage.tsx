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
import { mainTheme } from "../../../theme";
import { LoggedInHeaderBar } from "../../extras/LoggedInHeaderBar";

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
          `${process.env.REACT_APP_URL}/api/v1/users/${id}`,
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
    };
    getUser();
  }, [updateUserList]);
  if (allUser !== undefined && allUser.length > 0) {
    return (
      <Container maxWidth="md">
        <LoggedInHeaderBar />
        <Box sx={{ marginTop: 15 }}>
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
              <Button
                onClick={() => handleDelete(user.id)}
                variant="outlined"
                sx={{
                  borderColor: mainTheme.palette.text.primary,
                  color: mainTheme.palette.text.primary,
                }}
              >
                Delete user
              </Button>
            </>
          ))}
        </Box>
      </Container>
    );
  } else {
    return <div>Loading</div>;
  }
};
