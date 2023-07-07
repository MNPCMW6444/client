import { AIdeatorContextProvider } from "../../../context/AIdeatorContext";
import AIdeator from "./AIdeator";

const AIdeatorWrapper = () => (
  <AIdeatorContextProvider>
    <AIdeator />
  </AIdeatorContextProvider>
);

export default AIdeatorWrapper;
