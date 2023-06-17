import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Checkemail from "./Checkemail";
import Website from "./Website";

const WhiteAuthRouter = () => (
  <Routes>
    <Route path="/*" element={<Website />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/reset" element={<Reset />} />
    <Route path="/checkemail" element={<Checkemail />} />
  </Routes>
);

export default WhiteAuthRouter;
