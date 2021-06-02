import React from "react";
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'

export default function NavbarComponent(){

    const { currentUser} = useAuth()

    return(
        <Navbar className="bg-dark justify-content-between p-3 mb-3" variant="dark" >
            <Navbar.Brand as={Link} to="/dashboard">
                SudDrive
            </Navbar.Brand>
            <Nav className="d-flex">
                <Nav.Link as={Link} to="/profile">
                    <img src= {currentUser.photoURL} alt="profile" className="rounded-circle"  style={{width: "30px"}}/>
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                    {currentUser.displayName}
                </Nav.Link>
            </Nav>

        </Navbar>
    )
}