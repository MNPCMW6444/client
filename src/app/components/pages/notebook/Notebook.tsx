import React, {useContext, useState, useEffect} from "react";
import UserContext from "../../../context/UserContext";
import {
    Tab,
    Tabs,
    TabScrollButton,
    TextField,
    Typography,
    Grid,
    Tooltip,
} from "@mui/material";
import {MainserverContext} from "@failean/mainserver-provider";
import {toast} from "react-toastify";
import {Add, Delete, Save} from "@mui/icons-material";
import {Button} from "@mui/material";

const Notebook = () => {
    const mainserverContext = useContext(MainserverContext);
    const axiosInstance = mainserverContext?.axiosInstance;
    const {ideas, ideaNames, refreshUserData} = useContext(UserContext);
    const [activeIdeaIndex, setActiveIdeaIndex] = useState<number>(0);
    const [inputText, setInputText] = useState<string>(ideas[0]?.idea);

    useEffect(() => {
        setInputText(ideas[activeIdeaIndex]?.idea);
    }, [ideas, activeIdeaIndex]);


    const createNew = () => {
        if (axiosInstance)
            axiosInstance
                .post("data/ideas/saveIdea", {
                    idea: " ",
                })
                .then(() => {
                    refreshUserData();
                })
                .catch(() => {
                    refreshUserData();
                    toast.error("Error saving data to server");
                });
    }

    const handleInputChange = (event: any) => {
        const text = event.target.value;
        setInputText(text);
    };

    return !ideas ? (
        <Typography>Loading...</Typography>
    ) : (
        <>
            {ideas && (
                <Grid container direction="column" rowSpacing={2}>
                    <Grid item container alignItems="center">
                        <Tabs
                            value={activeIdeaIndex}
                            onChange={(e: any, x) => {
                                setActiveIdeaIndex(x);
                            }}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            style={{flex: 1}}
                        >
                            {ideaNames.map((name, index) =>
                                (
                                    <Tooltip title={name} key={index}>
                                        <Tab
                                            label={`${index + 1}: ${name.substring(0, 30) === " " ? "New Idea" : name.substring(0, 30)}...`}
                                        />
                                    </Tooltip>
                                )
                            )}
                            <TabScrollButton direction="right" orientation="horizontal"/>
                        </Tabs>
                        <Button
                            color="secondary"
                            onClick={createNew}
                            style={{marginLeft: "16px"}}
                        >
                            New <Add/>
                        </Button>
                    </Grid>
                    <Grid item>
                        <TextField
                            disabled={ideas.length === 0}
                            multiline
                            rows={10}
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                            value={inputText || "Click on 'New+' to create you first idea..."}

                        />
                    </Grid>
                    <Grid item container columnSpacing={4}>
                        <Grid item>
                            <Button
                                color="secondary"
                                disabled={ideas.length === 0}
                                onClick={() => {
                                    if (axiosInstance)
                                        axiosInstance
                                            .post("data/ideas/saveIdea", {
                                                idea: inputText,
                                                ideaID: ideas[activeIdeaIndex]._id,
                                            })
                                            .then(() => {
                                                refreshUserData();
                                            })
                                            .catch(() => {
                                                refreshUserData();
                                                toast.error("Error saving data to server");
                                            });
                                }}
                            >
                                <Save/>
                                Save this Idea
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                color="secondary"
                                disabled={ideas.length === 0}
                                onClick={() => {
                                    if (axiosInstance)
                                        axiosInstance
                                            .post("data/ideas/archiveIdea", {
                                                ideaID: ideas[activeIdeaIndex]._id,
                                            })
                                            .then(() => {
                                                refreshUserData();
                                            })
                                            .catch(() => {
                                                refreshUserData();
                                                toast.error("Error saving data to server");
                                            });
                                }}
                            >
                                <Delete/>
                                Delete this Idea
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
};
export default Notebook;
