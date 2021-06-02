import React from "react";
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom";

export default function NavbarComponent(){

    return(
        <Navbar className="bg-dark justify-content-between p-3 mb-3" variant="dark" >
            <Navbar.Brand as={Link} to="/dashboard">
                SudDrive
            </Navbar.Brand>
            <Nav className="d-flex">
                <Nav.Link as={Link} to="/login">
                    Se connecter
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                    S'inscrire
                </Nav.Link>
            </Nav>

        </Navbar>
    )
}