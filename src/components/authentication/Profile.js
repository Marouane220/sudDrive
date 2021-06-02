import React, {useState} from 'react';
import {Card, Button, Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import NavbarComponent from '../sud-drive/NavbarComponent';
import CentredContainer from './CentredContainer';


export default function Profile() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout(){
        setError('')
        try{
            await logout()
            history.push('/')
        } catch {
            setError('Erreur de Deconnexion')
        }
    }

    return(
        <>
            <NavbarComponent/>
            <CentredContainer>
                <Card>
                    <Card.Body>
                        <h1 className="text-center mb-4 p-3"> Votre profile </h1>
                        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                        <div className="w-100 mb-3 text-center">
                            <img src= {currentUser.photoURL} alt="profile" className="rounded-circle " style={{width: "150px", height: "auto"}}/>
                        </div>
                        <div className="w-100 mb-3 text-center">
                            <strong>Nom:</strong> {currentUser.displayName}
                        </div>
                        <div className="w-100 mb-3 text-center">
                            <strong>E-mail:</strong> {currentUser.email}
                        </div>
                        <Link to='update-profile' className='btn btn-secondary w-100 mt-3'>
                            Mise à jours du profile
                        </Link>
                        <div className="w-100 text-center mt-2">
                            <Button variant="link" onClick={handleLogout}>Déconnexion</Button>
                        </div>
                </Card.Body>
                </Card>
            </CentredContainer>
        </>
    )
}