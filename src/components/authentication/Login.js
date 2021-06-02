import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import CentredContainer from './CentredContainer';
import NavbarAcceuil from "../Acceuil/NavbarAcceuil";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, signupGoogle, signupFacebook } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/dashboard')
        } catch {
            setError('Échec de la connexion')
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
            setError('Échec de la connexion')
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
            setError('Échec de la connexion')
        }
        setLoading(false)
    }

    return (
        <>
        <NavbarAcceuil />
        <CentredContainer>
            <Card>
                <Card.Body>
                    <h1 className="text-center mb-4"> Se connecter </h1>
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required placeholder="e-mail"/>
                        </Form.Group>
                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required placeholder="mot de passe"/>
                        </Form.Group>
                        <Button disabled={loading} className="btn btn-warning w-100 mb-3" type="submit">Connexion</Button>
                        <Button disabled={loading} onClick={signupG} className="btn btn-danger w-100 mb-3" id="signUpGoogle">Se connecter avec Google</Button>
                        <Button disabled={loading} onClick={signupF} className="w-100 mb-2" id="signUpFacebook" icon={<i className="fa fa-facebook" style={{marginLeft:'5px'}}></i>}>Se connecter avec Facebook</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to='/forgot-password'>Mot de passe oublié ?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Vous n'avez pas un compte ? <Link to='/signup'>S'inscrire</Link>
            </div>
        </CentredContainer>
        </>
    )
}