import React from "react";
import { Container } from 'react-bootstrap'

export default function CentredContainer({ children }) {
    return(
        <Container className="container-fluid d-flex align-items-center justify-content-center" 
        style={{ minHeight: "100vh"}} >
            <div className='w-100' style={{maxWidth: "450px"}}>
              {children}
            </div>
        </Container>
    )
}