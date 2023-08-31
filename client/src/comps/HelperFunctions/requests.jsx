import axios from "axios";
import getCookieValue from "./getCookieValue";
import { useEffect } from "react";
import { Toaster } from "../HelperFunctions/toastify";

const axiosInstance = axios.create();

const shouldHeaders = (bool) => {
  const token = getCookieValue("t");
  if (bool) {
    return {
      headers: {
        Authorization: `Bearer ${token[0][1]}`,
      },
    };
  }
  return null;
};

const postRequest = async (route, body, useHeaders) => {
  try {
    const res = await axiosInstance.post(
      route,
      body,
      shouldHeaders(useHeaders)
    );
    Toaster("success", res.data.msg);
    return res;
  } catch (error) {
    Toaster("error", error.response.data.err);
  }
};

const getRequest = async (route, useHeaders) => {
  try {
    const res = await axiosInstance.get(route, shouldHeaders(useHeaders));
    Toaster("success", res.data.msg);
    return res;
  } catch (error) {
    Toaster("error", error.response.data.err);
  }
};

const deleteRequest = async (route, useHeaders) => {
  try {
    const res = await axiosInstance.delete(route, shouldHeaders(useHeaders));
    Toaster("success", res.data.msg);
    return res;
  } catch (error) {
    Toaster("error", error.response.data.err);
  }
};

const patchRequest = async (route, body, useHeaders) => {
  try {
    const res = await axiosInstance.patch(
      route,
      body,
      shouldHeaders(useHeaders)
    );
    Toaster("success", res.data.msg);
    return res;
  } catch (error) {
    Toaster("error", error.response.data.err);
  }
};

export { postRequest, getRequest, deleteRequest, patchRequest };
