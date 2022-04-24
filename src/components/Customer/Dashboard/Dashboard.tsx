import React, {FC} from 'react';
import {Col} from "react-bootstrap";
import AccountTable from "./AccountTable/AccountTable";
import TransfersTable from "./TransfersTable/TransfersTable";

interface DashboardProps {
}

const Dashboard: FC<DashboardProps> = () => (
    <Col xs={11} lg={9} xl={8} xxl={6} className="my-5 mx-auto">
        <Col className="card mb-4">
            <h5 className="card-header">Accounts</h5>
            <Col className="card-body">
                <AccountTable/>
            </Col>
        </Col>
        <div className="card">
            <h5 className="card-header">Last 5 transfers</h5>
            <div className="card-body">
                <TransfersTable/>
            </div>
        </div>
    </Col>
)

export default Dashboard;
