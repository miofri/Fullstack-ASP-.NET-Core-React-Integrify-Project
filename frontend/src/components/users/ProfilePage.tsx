import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { LogoutButton } from "../extras/LogoutButton";
import { Link, useNavigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { LoggedInHeaderBar } from "../extras/LoggedInHeaderBar";
import { AdminUserOperationPage } from "./admin/AdminUserOperationPage";
import { mainTheme } from "../../theme";

export const ProfilePage = () => {
  const userInfoFromStore = useSelector((state: RootState) => state.userInfo);
  const userRole = useSelector((state: RootState) => state.user.role);
  const bearerToken = useSelector((state: RootState) => state.auth.bearerToken);
  const navigate = useNavigate();
  if (bearerToken == "") {
    navigate("/login");
    return <LoginPage />;
  } else {
    return (
      <>
        <LoggedInHeaderBar />
        <Container maxWidth="sm">
          <Box
            sx={{
              flex: 1,
              height: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
              marginTop: 12,
              textAlign: "center",
              // backgroundColor: "pink",
            }}
          >
            <Typography variant="h3">
              {`${userInfoFromStore.firstName} ${userInfoFromStore.lastName}`}
            </Typography>
            <hr style={{ color: "grey", width: "100%" }}></hr>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                textAlign: "left",
                my: 1,
                border: "solid",
                borderWidth: 1,
                padding: 2,
                width: "100%",
              }}
            >
              <Typography variant="h5">
                <b>Username:</b> {userInfoFromStore.userName}
                <br></br>
                <b>Email:</b> {userInfoFromStore.email}
                <br></br>
                <b>Address:</b> {userInfoFromStore.address}
                <br></br>
              </Typography>
            </Box>
          </Box>
          {/* <LogoutButton /> */}
          {userRole == "Admin" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignContent: "center",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <Link to="/admin/users">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: mainTheme.palette.text.primary,
                    color: mainTheme.palette.text.primary,
                  }}
                >
                  Users
                </Button>
              </Link>
              <Link to="/admin/products">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: mainTheme.palette.text.primary,
                    color: mainTheme.palette.text.primary,
                  }}
                >
                  Products
                </Button>
              </Link>
              <Link to="/admin/orders">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: mainTheme.palette.text.primary,
                    color: mainTheme.palette.text.primary,
                  }}
                >
                  Orders
                </Button>
              </Link>
            </Box>
          ) : (
            <div></div>
          )}
        </Container>
      </>
    );
  }
};
