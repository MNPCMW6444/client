import { useEffect, useContext, lazy } from "react";
import { useLocation } from "react-router-dom";
import { MainserverContext } from "@failean/mainserver-provider";

const MyAccount = lazy(() => import("./pages/my-account/MyAccount"));
const About = lazy(() => import("./pages/about/About"));
const Notebook = lazy(() => import("./pages/notebook/Notebook"));
const AIdeatorWrapper = lazy(() => import("./pages/aideator/AIdeatorWrapper"));
//const Deck = lazy(() => import("./pages/deck/Deck.future"));
const Backlog = lazy(() => import("./pages/backlog/Backlog"));

interface WhitePageProps {
  path: string;
}

const WhitePage = ({ path }: WhitePageProps) => {
  const location = useLocation();

  const mainserver = useContext(MainserverContext);
  const axiosInstance = mainserver?.axiosInstance;

  useEffect(() => {
    axiosInstance?.post("analytics/render", { route: location.pathname });
  }, [location, axiosInstance]);

  return path === "my-account" ? (
    <MyAccount />
  ) : path === "about" ? (
    <About />
  ) : path === "*" ? (
    <Notebook />
  ) : path === "aideator" ? (
    <AIdeatorWrapper />
  ) : (
    <Backlog />
  );
};

export default WhitePage;
