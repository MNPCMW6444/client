import WhiteRouter from "./components/WhiteRouter";
import { UserContextProvider } from "./context/UserContext";
import { MainserverProvider } from "@failean/mainserver-provider";
import WhiteThemeProvider from "./providers/style/WhiteThemeProvider";

const App = () => (
  <WhiteThemeProvider>
    <MainserverProvider
      env={
        process.env.REACT_APP_WHITE_ENV === "prod"
          ? undefined
          : (process.env.REACT_APP_WHITE_ENV as "dev" | "tst")
      }
    >
      <UserContextProvider>
        <WhiteRouter />
      </UserContextProvider>
    </MainserverProvider>
  </WhiteThemeProvider>
);

export default App;
