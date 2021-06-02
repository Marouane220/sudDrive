import React from "react";
import NavbarAcceuil from "./NavbarAcceuil";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Acceuil(){

    return(
        <>
        <div>
            <NavbarAcceuil />
        </div>
        <div  className="text-center">
            <Container fluid>
                <h1 className=" fs-1 mt-5 lg">Profitez des fonctionnalités de sudDrive sur n'importe quel appareil</h1>
                <p fluid className=" ffw-lighter m-5 " > sudDrive développé avec Reactjs et le modele de service cloud Baas (Backend as a service) avec Firebase vous permet ainsi de travailler facilement depuis votre navigateur, votre appareil mobile, votre tablette ou votre ordinateur.</p>
            </Container>
            <Button className="btn btn-success bg" as={Link} to="/signup">Lancez-vous </Button>
        </div>
        </>
    )
}