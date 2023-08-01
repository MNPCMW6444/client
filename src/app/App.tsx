import WhiteRouter from "./components/WhiteRouter";
import { UserContextProvider } from "./context/UserContext";
import { MainserverProvider } from "@failean/mainserver-provider";
import WhiteThemeProvider from "./providers/style/WhiteThemeProvider";

const App = () => (
  <WhiteThemeProvider>
    <MainserverProvider env="dev">
      <UserContextProvider>
        <WhiteRouter />
      </UserContextProvider>
    </MainserverProvider>
  </WhiteThemeProvider>
);

export default App;
