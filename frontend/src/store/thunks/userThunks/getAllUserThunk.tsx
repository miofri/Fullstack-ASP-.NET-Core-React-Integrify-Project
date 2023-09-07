import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUserThunk = createAsyncThunk(
  "user/getAllUser",
  async (bearerToken: string) => {
    let postConfig = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/users`,
        postConfig
      );

      return response.data;
    } catch (error) {}
  }
);
