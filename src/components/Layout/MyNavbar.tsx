import React, {FC, useContext} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {getClaimFromToken, getRoleFromToken} from "../../utils/tokenUtils";
import {TokenContext} from "../../App";
import {useNavigate} from "react-router-dom";

interface MyNavbarProps {
}

const MyNavbar: FC<MyNavbarProps> = () => {
    const {token, setToken} = useContext(TokenContext);
    const navigate = useNavigate()

    const logout = () => {
        setToken('')
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("refreshToken")
        navigate('/')
    };

    const getUserDropdown = () => {
        const userName = getClaimFromToken(token, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name');
        return (
            <NavDropdown title={userName} align={"end"}>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
        )
    }

    const getAdminNavLinks = () => {
        return (
            <>
                <LinkContainer to="/employees">
                    <Nav.Link>Employees</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/employees/create">
                    <Nav.Link>Create Employee</Nav.Link>
                </LinkContainer>
            </>
        )
    }

    const getEmployeeNavLinks = () => {
        return (
            <>
                <LinkContainer to="/customers">
                    <Nav.Link>Customers</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/customers/create">
                    <Nav.Link>Create Customer</Nav.Link>
                </LinkContainer>
            </>
        )
    }

    const getCustomerNavLinks = () => {
        return (
            <>
                <LinkContainer to="/dashboard">
                    <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/transfers/new">
                    <Nav.Link>New Transfer</Nav.Link>
                </LinkContainer>
            </>
        )
    }

    const getNavLinks = () => {
        const role = getRoleFromToken(token);
        switch (role) {
            case "Admin":
                return getAdminNavLinks();
            case "Employee":
                return getEmployeeNavLinks();
            case "Customer":
                return getCustomerNavLinks();
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container fluid>
                <Navbar.Brand>Bank App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="col-12">
                        <Nav.Item className="me-auto d-lg-flex">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            {token && getNavLinks()}
                        </Nav.Item>
                        <Nav.Item className="d-lg-flex">
                            {token && getUserDropdown()}
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;