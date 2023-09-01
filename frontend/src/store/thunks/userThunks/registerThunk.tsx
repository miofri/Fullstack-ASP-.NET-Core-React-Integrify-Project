import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RegistrationData } from "../../../interface/Users";

export const registerThunk = createAsyncThunk(
  "currentUser/registerUser",
  async (registrationData: RegistrationData) => {
    try {
      const response = await axios.post(
        "http://localhost:5145/api/v1/users",
        registrationData
      );
      return "success";
    } catch (error: any) {
      if (error.response.data === "Email exists") {
        console.log("failed");
        return "failed";
      }
      throw error;
    }
  }
);
