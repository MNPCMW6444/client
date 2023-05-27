import axios from "axios";
import { createContext } from "react";
import domain from "../util/config/domain";

const axiosInstance = axios.create({
  baseURL: domain,
  timeout: 4000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
const MainServerContext = createContext(axiosInstance);

export { MainServerContext };
