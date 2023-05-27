import { useContext, useState } from "react";
import UserContext from "../../../context/UserContext";
import { TextField } from "@mui/material";
import _ from "lodash";
import { MainServerContext } from "../../../context/MainServerContext";

export default function Home() {
  const { user } = useContext(UserContext);
  const [inputText, setInputText] = useState("");

  const axiosInstance = useContext(MainServerContext);

  const sendToServer = _.debounce((text: any) => {
    axiosInstance.post("/data/idea", { text });
  }, 1000);

  const handleInputChange = (event: any) => {
    const text = event.target.value;
    setInputText(text);
    sendToServer(text);
  };

  return (
    <>
      <p>Hi {user.name}</p>
      <TextField
        multiline
        rows={10}
        variant="outlined"
        fullWidth
        onChange={handleInputChange}
        value={inputText}
        //... rest of your TextField properties
      />
    </>
  );
}
