import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";

const WhiteAuthRouter = () => (
  <Routes>
    <Route
      path="/*"
      element={
        <iframe
          src={process.env.PUBLIC_URL + "/website/index.html"}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          title="site"
        ></iframe>
      }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/reset" element={<Reset />} />
  </Routes>
);

export default WhiteAuthRouter;
