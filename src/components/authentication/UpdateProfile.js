import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import NavbarComponent from '../sud-drive/NavbarComponent';
import CentredContainer from './CentredContainer';

export default function UpdateProfile() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const oldpasswordRef = useRef();
    const { currentUser, updateEmail, updateName, updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Mots de passes ne correspondent pas')
        }    

        const promises = []

        setLoading(true)
        setError('')

        if (emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if (nameRef.current.value !== currentUser.displayName){
            promises.push(updateName(nameRef.current.value))
        }
        if (passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/profile')
        }).catch(() => {
            setError('Erreur est survenue lors de la mise à jour')
        }).finally(() => {
            setLoading(false)
        })

    }

    return (
        <>
            <NavbarComponent/>
            <CentredContainer>
                <Card>
                    <Card.Body>
                        <h1 className="text-center mb-4 p-4"> Mise à jour du profile </h1>
                        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="name" className="mb-3">
                                <Form.Label>Pseudo</Form.Label>
                                <Form.Control type="text" ref={nameRef} defaultValue={currentUser.displayName} placeholder="pseudo"/>
                            </Form.Group>
                            <Form.Group id="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required placeholder="e-mail"/>
                            </Form.Group>
                            <Form.Group id="password" className="mb-3">
                                <Form.Label>Nouveau mot de passe</Form.Label>
                                <Form.Control type="password" ref={passwordRef} placeholder="Laisser vide pour laisser le même mot de passe"/>
                            </Form.Group>
                            <Form.Group id="password-confirm" className="mb-4">
                                <Form.Label>Confirmation du mot de passe</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} placeholder="Laisser vide pour laisser le même mot de passe"/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mb-3" type="submit">Mettre à jour</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Link to='/profile'> Annuler </Link>
                </div>
            </CentredContainer>
        </>
    )
}
