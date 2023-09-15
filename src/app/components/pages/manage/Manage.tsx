import React, {useState, useEffect, useContext} from 'react';
import {Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {MainserverContext} from "@failean/mainserver-provider";
import {Job} from "bull";

interface Jobb extends Job {
    status: string
}


const ManageTableCell = styled(TableCell)({
    border: "1px solid gray"
});

const Manage = () => {
    const msc = useContext(MainserverContext);
    const axiosInstance = msc?.axiosInstance;
    const [tasks, setTasks] = useState<Jobb[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axiosInstance?.get("data/prompts/tasks");
                if (res?.data?.data) {
                    setTasks(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setError("Failed to fetch tasks.");
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [axiosInstance]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Grid container direction="column" alignItems="center" rowSpacing={10}>
            <Grid item>
                <Typography variant="h2">Manage Your AIdeator Tasks</Typography>
            </Grid>
            <Grid item>
                <Table>
                    <TableHead>
                        <TableRow>
                            <ManageTableCell>ID</ManageTableCell>
                            <ManageTableCell>Status</ManageTableCell>
                            <ManageTableCell>PromptName</ManageTableCell>
                            <ManageTableCell>Time</ManageTableCell> </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task, index: number) => (
                            <TableRow key={index}>
                                <ManageTableCell>{task.id}</ManageTableCell>
                                <ManageTableCell>{task.status}</ManageTableCell>
                                <ManageTableCell>{task.data}</ManageTableCell>
                                <ManageTableCell>{new Date(task.timestamp).toLocaleString()}</ManageTableCell></TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
};

export default Manage;
