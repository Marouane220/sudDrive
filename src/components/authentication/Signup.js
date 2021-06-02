import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import CentredContainer from './CentredContainer';
import NavbarAcceuil from "../Acceuil/NavbarAcceuil";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, signupGoogle, signupFacebook } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Mots de passes ne correspondent pas')
        }
        setError('')
        if(passwordRef.current.value.length < 6){
            return setError('Mot de passe doit comporter au moins 6 caractères')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
            history.push('/dashboard')
        } catch {
            setError('Échec de la creation du compte')
        }
        setLoading(false)

    }

    async function signupG (e){
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await signupGoogle();
            history.push('/dashboard')
        } catch {
            setError('Échec de la creation du compte')
        }
        setLoading(false)
    }

    async function signupF (e){
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await signupFacebook();
            history.push('/dashboard')
        } catch {
            setError('Échec de la creation du compte')
        }
        setLoading(false)
    }

    return (
        <>
        <NavbarAcceuil />
        <CentredContainer>
            <Card>
                <Card.Body>
                    <h1 className="text-center mb-4"> Créer un Compte </h1>
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name" className="mb-3">
                            <Form.Label>Pseudo</Form.Label>
                            <Form.Control type="text" ref={nameRef} required placeholder="pseudo"/>
                        </Form.Group>
                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required placeholder="e-mail"/>
                        </Form.Group>
                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required placeholder="mot de passe"/>
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mb-4">
                            <Form.Label>Confirmation du mot de passe</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required placeholder="confirmation du mot de passe"/>
                        </Form.Group>
                        <Button disabled={loading} className="btn btn-warning w-100 mb-3" type="submit">S'inscrire</Button>
                        <Button disabled={loading} onClick={signupG} className="btn btn-danger w-100 mb-3" id="signUpGoogle">S'inscrire avec Google</Button>
                        <Button disabled={loading} onClick={signupF} className="w-100 mb-3" id="signUpFacebook">S'inscrire avec Facebook</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Vous avez déjà un compte ? <Link to='/login'>Se connecter</Link>
            </div>
        </CentredContainer>
        </>
    )
}
