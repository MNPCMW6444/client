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
    TableContainer, Button
} from "@mui/material";
import styled from '@emotion/styled';
import {Fragment, useContext} from "react";
import UserContext from "../../../context/UserContext";
import {WhiteModels} from "@failean/shared-types";
import useResponsive from "../../../hooks/useResponsive";
import {Edit} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

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
    textAlign: "center"
});

interface Field {
    name: string,
    valueGetter: (ideas: WhiteModels.Data.Ideas.WhiteIdea[], idaeNames: string[], index: number) => string
}

const config: Field[] = [
    {name: "Name", valueGetter: (_, idaeNames, index: number) => (idaeNames[index])},
    {name: "Idea", valueGetter: (ideas, _, index: number) => (ideas[index].idea)},
    {name: "Ideation", valueGetter: (_, __, ___: number) => ("0%")},
    {name: "Validation", valueGetter: (_, __, ___: number) => ("0%")},
]

const Backlog = () => {
    const {isMobile} = useResponsive();
    const {ideas, ideaNames} = useContext(UserContext);

    const renderRow = (ideaObj: WhiteModels.Data.Ideas.WhiteIdea, i: number) => {
        const {_id} = ideaObj;

        if (isMobile) {
            return (
                <MobileRow key={_id}>
                    {config.map(({name, valueGetter}) => (
                        <MobileCell>{`${name}: ${valueGetter(ideas, ideaNames, i)}`}</MobileCell>
                    ))}
                </MobileRow>
            );
        } else {
            return (
                <TableRow key={_id}>
                    {config.map(({valueGetter}) => (
                        <Tooltip title={valueGetter(ideas, ideaNames, i)}>
                            <TruncatedCell>{valueGetter(ideas, ideaNames, i)}</TruncatedCell>
                        </Tooltip>
                    ))}

                </TableRow>
            );
        }
    };

    const navigate = useNavigate()

    return (
        <Grid container direction="column" rowSpacing={6} alignItems="center">
            <Grid item>
                <Typography variant="h3">Idea Backlog:</Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={() => navigate("/notebook")}>Edit Ideas <Edit/></Button>
            </Grid>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table>
                        {!isMobile && (
                            <TableHead>
                                <TableRow>
                                    {config.map(({name}) => (
                                        <TableCell>{name}</TableCell>))}
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
