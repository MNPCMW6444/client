import React, {useState} from 'react';
import {Tabs, Tab, Container, Paper} from '@mui/material';
import Security from "./tabs/Security";
import Billing from "./tabs/Billing";

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState<number>(0);


    return (
        <Container>
            <Paper elevation={3}>
                <Tabs value={activeTab} onChange={(event, newValue) => {
                    setActiveTab(newValue);
                }}>
                    <Tab label="Personal Details and Security"/>
                    <Tab label="Billing Settings"/>
                </Tabs>
            </Paper>

            {activeTab === 0 && <Security/>}
            {activeTab === 1 && <Billing/>}
        </Container>
    );
};

export default MyAccount;
