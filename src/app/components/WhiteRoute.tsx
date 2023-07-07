import { useEffect, useContext } from "react";
import { Route, useLocation } from "react-router-dom";
import { MainserverContext } from "@failean/mainserver-provider";

const WhiteRoute = ({ path, element, ...rest }: any) => {
  const location = useLocation();

  const mainserver = useContext(MainserverContext);
  const axiosInstance = mainserver?.axiosInstance;

  useEffect(() => {
    axiosInstance?.post("analytics/render", { route: location.pathname });
  }, [location, axiosInstance]);

  return <Route path={path} element={element} {...rest} />;
};

export default WhiteRoute;
