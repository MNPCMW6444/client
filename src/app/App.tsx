import FailerRouter from "./components/FailerRouter";
import { UserContextProvider } from "./context/UserContext";
import { MainserverContextProvider } from "./context/MainserverContext";
import FailerThemeProvider from "./providers/style/FailerThemeProvider";

const App = () => (
  <FailerThemeProvider>
    <MainserverContextProvider>
      <UserContextProvider>
        <FailerRouter />
      </UserContextProvider>
    </MainserverContextProvider>
  </FailerThemeProvider>
);

export default App;
