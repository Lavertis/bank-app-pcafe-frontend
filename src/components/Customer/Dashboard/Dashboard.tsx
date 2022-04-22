import React, {FC} from 'react';
import {Col} from "react-bootstrap";
import AccountsTable from "./AccountsTable/AccountsTable";

interface DashboardProps {
}

const Dashboard: FC<DashboardProps> = () => {


    return (
        <Col xs={11} lg={9} xl={8} xxl={6} className="my-5 mx-auto">
            <Col className="card mb-4">
                <h5 className="card-header">Accounts</h5>
                <Col className="card-body">
                    <AccountsTable/>
                </Col>
            </Col>
            <div className="card">
                <h5 className="card-header">Transfers</h5>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>
        </Col>
    );
}

export default Dashboard;
