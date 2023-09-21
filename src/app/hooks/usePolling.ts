import {useEffect, useState} from "react";
import {PromptName, WhiteModels} from "@failean/shared-types"; // Replace with your actual axios instance

export const usePolling = (axiosInstance: any) => {
    const [newPolled, setNewPolled] = useState<PromptName[]>([]);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (axiosInstance) {
                const res = await axiosInstance.get("data/prompts/tasks");
                if (res?.data?.data) {
                    const x: WhiteModels.Tasks.OpenAITaskModel[] = res.data.data.filter(({status}: WhiteModels.Tasks.OpenAITaskModel) => status === "running");
                    setNewPolled(x.filter(({promptName}) => promptName !== "idea").map(({promptName}) => promptName));
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [axiosInstance]);

    return newPolled;
};
