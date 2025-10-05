import axios from "axios";
import React, { useEffect } from "react";

const axiosInstance = axios.create({
//   baseURL: "https://know-loop-server.vercel.app/",
  baseURL: 'http://localhost:5000/'
});

const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;