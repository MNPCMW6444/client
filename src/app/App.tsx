import FailerRouter from "./components/FailerRouter";
import { UserContextProvider } from "./context/UserContext";
import ProvideMainServer from "./providers/ProvideMainServer";
import FailerThemeProvider from "./providers/style/FailerThemeProvider";

const App = () => (
  <FailerThemeProvider>
    <ProvideMainServer>
      <UserContextProvider>
        <FailerRouter />
      </UserContextProvider>
    </ProvideMainServer>
  </FailerThemeProvider>
);

export default App;
