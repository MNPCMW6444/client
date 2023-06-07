import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";

const WhiteAuthRouter = () => (
  <Routes>
    <Route path="/*" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/reset" element={<Reset />} />
  </Routes>
);

export default WhiteAuthRouter;
