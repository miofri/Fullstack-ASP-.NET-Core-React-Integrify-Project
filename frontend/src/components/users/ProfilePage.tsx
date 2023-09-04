import { Avatar, Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { LogoutButton } from "../extras/LogoutButton";
import { useNavigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { LoggedInHeaderBar } from "../extras/LoggedInHeaderBar";

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
              my: 12,
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
