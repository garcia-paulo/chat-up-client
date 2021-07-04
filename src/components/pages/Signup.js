import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { signup } from '../../api/userApi';

export default function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [message, setMessage] = useState({
        error: "",
        open: false
    })

    const handleChange = value => event => {
        setMessage({ error: "", open: false });
        setUser({ ...user, [value]: event.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        signup(user)
            .then(data => {
                if (data.error) {
                    setMessage({
                        open: false,
                        error: data.error
                    });
                } else {
                    setMessage({
                        error: "",
                        open: true
                    });
                    setUser({
                        name: "",
                        email: "",
                        password: ""
                    })
                }
            })
    }

    return (
        <Container className="align-items-center d-flex justify-content-center" style={{ height: "100vh" }}>

            <Form onSubmit={handleSubmit} className="w-100">
                <div className="alert alert-danger" style={{ display: message.error ? "" : "none" }}>
                    {message.error}
                </div>
                <div className="alert alert-info" style={{ display: message.open ? true : "none" }}>
                    Conta criada com sucesso!
            </div>
                <Form.Group>
                    <Form.Label>Nome de Usuário</Form.Label>
                    <Form.Control onChange={handleChange("name")} type="text" placeholder="Exemplo_123" value={user.name} />
                    <Form.Label className="mt-3">E-mail</Form.Label>
                    <Form.Control onChange={handleChange("email")} type="email" placeholder="nome@exemplo.com" value={user.email} />
                    <Form.Label className="mt-3">Senha</Form.Label>
                    <Form.Control onChange={handleChange("password")} type="password" placeholder="Sua senha deve conter ao menos 6 caracteres" value={user.password} />
                </Form.Group>
                <div className="d-flex justify-content-around mt-4">
                    <Link to="/">
                        <Button>VOLTAR</Button>
                    </Link>
                    <Button type="submit" variant="success">ENVIAR</Button>
                </div>
            </Form>
        </Container>
    )
}
