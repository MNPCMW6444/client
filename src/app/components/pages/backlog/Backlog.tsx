import React from 'react';
import {
    Grid,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Paper,
    TableContainer
} from "@mui/material";
import styled from '@emotion/styled';
import {Fragment, useContext} from "react";
import UserContext from "../../../context/UserContext";
import {WhiteModels} from "@failean/shared-types";
import useResponsive from "../../../hooks/useResponsive";

const DividerRow = styled.div({
    height: '1px',
    background: 'gray',
    margin: '8px 0',
});

const MobileRow = styled(TableRow)({
    display: 'block',
});

const MobileCell = styled(TableCell)({
    display: 'block',
    textAlign: 'center',
});

const TruncatedCell = styled(TableCell)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '15vw',
});

const Backlog = () => {
    const {isMobile} = useResponsive();
    const {ideas, ideaNames} = useContext(UserContext);

    const renderRow = (ideaObj: WhiteModels.Data.Ideas.WhiteIdea, i: number) => {
        const {idea, _id} = ideaObj;

        if (isMobile) {
            return (
                <MobileRow key={_id}>
                    <MobileCell>{`Name: ${ideaNames[i]}`}</MobileCell>
                    <MobileCell>{`Idea: ${idea}`}</MobileCell>
                    <MobileCell>{`ID: ${_id}`}</MobileCell>
                    <MobileCell>{`Status: ${idea}`}</MobileCell>
                </MobileRow>
            );
        } else {
            return (
                <TableRow key={_id}>
                    <Tooltip title={ideaNames[i]}>
                        <TruncatedCell>{ideaNames[i]}</TruncatedCell>
                    </Tooltip>
                    <Tooltip title={idea}>
                        <TruncatedCell>{idea}</TruncatedCell>
                    </Tooltip>
                    <Tooltip title={String(_id)}>
                        <TruncatedCell>{_id}</TruncatedCell>
                    </Tooltip>
                    <Tooltip title={idea}>
                        <TruncatedCell>{idea}</TruncatedCell>
                    </Tooltip>
                </TableRow>
            );
        }
    };

    return (
        <Grid container direction="column" spacing={3} alignItems="center">
            <Grid item>
                <Typography variant="h3">Idea Backlog:</Typography>
            </Grid>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table>
                        {!isMobile && (
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Idea</TableCell>
                                    <TableCell>Ideation</TableCell>
                                    <TableCell>Validation</TableCell>
                                </TableRow>
                            </TableHead>
                        )}
                        <TableBody>
                            {ideas.map((ideaObj, i) => (
                                <Fragment key={i}>
                                    {renderRow(ideaObj, i)}
                                    {isMobile && <DividerRow/>}
                                </Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default Backlog;
