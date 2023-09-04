import jwt_decode from "jwt-decode";

import { store } from "../../store/store";
import { authThunk } from "../../store/thunks/userThunks/authThunk";
import { AuthInfo } from "../../interface/Users";
import { currentUserSlice } from "../../store/slices/currentUserSlice";

export const dispatchInfoAndRedirect = async (
  data: AuthInfo,
  dispatch: any
) => {
  const response = await dispatch(authThunk(data));
  if (response.payload !== undefined && response.payload.startsWith("ey")) {
    const decodedJWT: { nameid: string; email: string; role: string } =
      jwt_decode(response.payload);
    store.dispatch(
      currentUserSlice.actions.setCurrentUser({
        id: decodedJWT.nameid,
        email: decodedJWT.email,
        role: decodedJWT.role,
      })
    );
    return "success";
  } else {
    return "failed";
  }
};
