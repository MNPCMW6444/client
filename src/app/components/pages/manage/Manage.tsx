import React, {useState, useEffect, useContext} from 'react';
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper} from '@mui/material';
import styled from '@emotion/styled';
import {MainserverContext} from '@failean/mainserver-provider';
import capitalize from '../../../util/capitalize';
import {WhiteModels} from '@failean/shared-types';
import useResponsive from "../../../hooks/useResponsive";


const DividerRow = styled.div({
    height: '1px',
    background: 'gray',
    margin: '8px 0',
});


const ManageTableCell = styled(TableCell)({
    border: '1px solid gray',
});

const MobileRow = styled(TableRow)({
    display: 'block',
});

const ZebraMobileRow = styled(MobileRow)<{ index: number }>(({index}) => ({
    backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
    margin: '8px 0', // Add margin
    padding: '4px 0', // Add padding
}));


const MobileCell = styled(TableCell)({
    display: 'block',
    textAlign: 'center',
});

const Manage = () => {
    const {isMobile} = useResponsive();


    const msc = useContext(MainserverContext);
    const axiosInstance = msc?.axiosInstance;
    const [tasks, setTasks] = useState<WhiteModels.Tasks.OpenAITaskModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axiosInstance?.get('data/prompts/tasks');
                if (res?.data?.data) {
                    setTasks(res.data.data.filter(({promptName}: any) => promptName !== "idea").sort((a: any, b: any) => {
                        return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
                    }));
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError('Failed to fetch tasks.');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [axiosInstance]);


    const renderRow = (task: WhiteModels.Tasks.OpenAITaskModel, index: number) => {
        if (isMobile) {
            return (
                <React.Fragment key={index}>
                    <ZebraMobileRow index={index}>
                        <MobileCell>{`Status: ${task.status}`}</MobileCell>
                        <MobileCell>{`Failure or Cost: ${task.promptResIDOrReason}`}</MobileCell>
                        <MobileCell>{`Prompt: ${capitalize(task.promptName)}`}</MobileCell>
                        <MobileCell>{`Time: ${new Date(task.startTime).toLocaleString()}`}</MobileCell>
                    </ZebraMobileRow>
                    <DividerRow/> {/* Divider */}
                </React.Fragment>
            );
        } else {
            return (
                <TableRow key={index}>
                    <ManageTableCell>{task.status}</ManageTableCell>
                    <ManageTableCell>{task.promptResIDOrReason}</ManageTableCell>
                    <ManageTableCell>{capitalize(task.promptName)}</ManageTableCell>
                    <ManageTableCell>{new Date(task.startTime).toLocaleString()}</ManageTableCell>
                </TableRow>
            );
        }
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Grid container direction="column" alignItems="center" spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h2" gutterBottom>AIdeator Runs History</Typography>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        {!isMobile && (
                            <TableHead>
                                <TableRow>
                                    <ManageTableCell>Status</ManageTableCell>
                                    <ManageTableCell>Failure Reason or Token Cost</ManageTableCell>
                                    <ManageTableCell>Prompt Names</ManageTableCell>
                                    <ManageTableCell>Time</ManageTableCell>
                                </TableRow>
                            </TableHead>
                        )}
                        <TableBody>
                            {tasks.map((task, index: number) => renderRow(task, index))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default Manage;
