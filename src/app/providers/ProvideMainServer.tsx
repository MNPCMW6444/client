import {
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AxiosInstance } from "axios";
import { MainServerContext } from "../context/MainServerContext";

interface ProvideMainServerProps {
  children: ReactNode;
  tryInterval?: number;
}

const DEFAULT_TRY_INTERVAL = 3000;

const IDLE = "IDLE";
const CHECKING_MESSAGE = "Checking server availability...";
const BAD_MESSAGE = "Server is not available. Please try again later.";
const GOOD_STATUS = "good";

const checkServerAvailability = async (axiosInstance: AxiosInstance) => {
  try {
    return (await axiosInstance.get("areyoualive")).data.answer === "yes"
      ? GOOD_STATUS
      : BAD_MESSAGE;
  } catch (err) {
    return BAD_MESSAGE;
  }
};

const ProvideMainServer: FunctionComponent<ProvideMainServerProps> = ({
  children,
  tryInterval,
}: ProvideMainServerProps) => {
  const [status, setStatus] = useState<string>(IDLE);
  const statusRef = useRef(status);

  const axiosInstance = useContext(MainServerContext);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    const setStatusAsyncly = async () => {
      setStatus(CHECKING_MESSAGE);
      const newStatus = await checkServerAvailability(axiosInstance);
      setStatus(newStatus);
      if (newStatus !== GOOD_STATUS) {
        setTimeout(setStatusAsyncly, tryInterval || DEFAULT_TRY_INTERVAL);
      }
    };
    if (statusRef.current === IDLE) {
      setStatusAsyncly();
    }
  }, [axiosInstance, tryInterval]);

  if (status === GOOD_STATUS) {
    return (
      <MainServerContext.Provider value={axiosInstance}>
        {children}
      </MainServerContext.Provider>
    );
  } else {
    return <div>{status}</div>;
  }
};
export default ProvideMainServer;
