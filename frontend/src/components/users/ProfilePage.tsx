import { Avatar, Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { LogoutButton } from "../extras/LogoutButton";
import { useNavigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";

export const ProfilePage = () => {
  const userInfoFromStore = useSelector((state: RootState) => state.userInfo);
  const bearerToken = useSelector((state: RootState) => state.auth.bearerToken);
  const navigate = useNavigate();
  if (bearerToken == "") {
    navigate("/login");
    return <LoginPage />;
  } else {
    return (
      <>
        <Container maxWidth="sm">
          <Box
            sx={{
              flex: 1,
              height: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
              my: 6,
              textAlign: "center",
              // backgroundColor: "pink",
            }}
          >
            <Avatar sx={{ bgcolor: "black" }}>
              {userInfoFromStore.firstName.charAt(0)}
              {userInfoFromStore.lastName.charAt(0)}
            </Avatar>
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
          <LogoutButton />
        </Container>
      </>
    );
  }
};
