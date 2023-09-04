import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mainTheme } from "../../theme";
import { useAppDispatch } from "../../store/hooks";
import { userLogout } from "../../store/actionManager";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(userLogout());
    localStorage.clear();
    navigate("/");
    navigate(0);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        marginTop: "1rem",
      }}
    >
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          borderColor: mainTheme.palette.text.primary,
          color: mainTheme.palette.text.primary,
        }}
      >
        Logout
      </Button>
    </div>
  );
};
