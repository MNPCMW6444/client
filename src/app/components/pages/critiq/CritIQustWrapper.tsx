import { CritIQuestContextProvider } from "../../../context/CritIQuestContext";
import CritIQuest from "./CritIQuest";

const CritIQuestWrapper = () => (
  <CritIQuestContextProvider>
    <CritIQuest />
  </CritIQuestContextProvider>
);

export default CritIQuestWrapper;
