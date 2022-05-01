import React, {FC} from 'react';
import {Card, Col} from "react-bootstrap";
import AccountTable from "./AccountTable/AccountTable";
import TransfersTable from "./TransfersTable/TransfersTable";

interface DashboardProps {
}

const Dashboard: FC<DashboardProps> = () => (
    <Col xs={11} lg={9} xl={8} xxl={6} className="my-5 mx-auto">
        <Card className="mb-4">
            <h5 className="card-header">Accounts</h5>
            <AccountTable/>
        </Card>
        <Card>
            <h5 className="card-header">Last 5 transfers</h5>
            <TransfersTable/>
        </Card>
    </Col>
)

export default Dashboard;
