import {useEffect, useContext, lazy} from "react";
import {useLocation} from "react-router-dom";
import {MainserverContext} from "@failean/mainserver-provider";
import Manage from "./pages/manage/Manage";
import Deck from "./pages/deck/Deck";
import Validator from "./pages/validator/Validator";

const MyAccount = lazy(() => import("./pages/my-account/MyAccount"));
const About = lazy(() => import("./pages/about/About"));
const Notebook = lazy(() => import("./pages/notebook/Notebook"));
const CritiQ = lazy(() => import("./pages/critiq/CritIQ"));

const AIdeatorWrapper = lazy(() => import("./pages/aideator/AIdeatorWrapper"));
//const Deck = lazy(() => import("./pages/deck/Deck.tsx"));
const Backlog = lazy(() => import("./pages/backlog/Backlog"));

interface WhitePageProps {
    path: string;
}


const WhitePage = ({path}: WhitePageProps) => {
    const location = useLocation();

    const mainserver = useContext(MainserverContext);
    const axiosInstance = mainserver?.axiosInstance;

    useEffect(() => {
        axiosInstance?.post("analytics/render", {page: location.pathname});
    }, [location, axiosInstance]);

    return path === "my-account" ? (
        <MyAccount/>
    ) : path === "about" ? (
        <About/>
    ) : path === "*" ? (
        <Backlog/>
    ) : path === "aideator" ? (
        <AIdeatorWrapper/>
    ) : path === "manage" ? (
        <Manage/>
    ) : path === "notebook" ? (
        <Notebook/>
    ) : path === "critiq" ? (
            <CritiQ/>
        )


        : path === "deck" ? (
                <Deck/>
            )


            : path === "validator" ? (
                    <Validator/>
                )


                : (
                    <Backlog/>
                );
};

export default WhitePage;
