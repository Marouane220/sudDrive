import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useAuth} from "../../context/AuthContext";
import CentredContainer from './CentredContainer';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Vérifiez votre boîte de réception')
        } catch {
            setError('Un erreur est survenue')
        }
        setLoading(false)

    }

    return (
        <CentredContainer>
            <Card>
                <Card.Body>
                    <h1 className="text-center mb-4 p-4"> Mot de passe oublié </h1>
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                    {message && <Alert variant="success" className="text-center">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required placeholder="e-mail"/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mb-3 mt-2" type="submit">Récupérer votre mot de passe</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to='/login'>Se connecter</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Vous n'avez pas un compte ? <Link to='/signup'>S'inscrire</Link>
            </div>
        </CentredContainer>
    )
}