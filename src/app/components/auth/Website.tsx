import { useContext, useEffect } from "react";
import { MainserverContext } from "@failean/mainserver-provider";

export default function Website() {
  const { axiosInstance } = useContext(MainserverContext);

  useEffect(() => {
    axiosInstance.get("/renderWebsite");
  }, [axiosInstance]);

  return <div>loading Website...</div>;
}
