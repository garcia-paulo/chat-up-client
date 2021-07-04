import React, { useState, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { login } from '../../api/authApi';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
	const [error, setError] = useState("");
	const [redirect, setRedirect] = useState(false);
	const userRef = useRef();
	const passRef = useRef();

	const { authenticate, isAuthenticated } = useAuth();

	const handleSubmit = event => {
		event.preventDefault();

		const user = {
			email: userRef.current.value,
			password: passRef.current.value
		}

		login(user)
			.then(data => {
				if (data.error) {
					setError(data.error);
				} else {
					authenticate(data, () => {
						setRedirect(true);
					});
				}
			})

	}

	if (redirect || isAuthenticated()) {
		return <Redirect to="/main" />
	}

	return (
		<div>
			<Container className="align-items-center d-flex justify-content-center" style={{ height: "90vh" }}>
				<Form onSubmit={handleSubmit} style={{ width: "300px" }}>
					<div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
						{error}
					</div>
					<Form.Group>
						<Form.Control type="email" ref={userRef} required placeholder="Endereço de e-mail" />
						<Form.Control type="password" ref={passRef} className="mt-3" required placeholder="Senha" />
					</Form.Group>
					<div className="d-flex justify-content-around mt-4">
						<Button type="submit">ENTRAR</Button>
						<Link to={"/register"}>
							<Button variant="success">CRIAR CONTA</Button>
						</Link>
					</div>
				</Form>
			</Container>
			<div>
				<hr />
				<div className="d-flex align-items-center justify-content-center">
					<span>Criado por Paulo Garcia</span>
				</div>
			</div>
		</div>
	)
}
