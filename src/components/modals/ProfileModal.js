import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import DeleteButton from '../DeleteButton';
import DefaultAvatar from '../../images/avatar.png';
import { edit } from '../../api/userApi';
import { useAuth } from '../contexts/AuthContext'

let userData;

export default function ProfileModal(props) {
	const { authenticate, isAuthenticated } = useAuth();

	const [user, setUser] = useState(isAuthenticated().user)
	const [photo, setPhoto] = useState(undefined);
	const [error, setError] = useState(null);

	useEffect(() => {
		userData = new FormData();
	}, [])

	const handleSubmit = e => {
		e.preventDefault();
		let token = isAuthenticated().token;

		edit(user._id, token, userData)
			.then(data => {
				if (data.error) {
					setError(data.error);
				} else {
					token = isAuthenticated();
					token.user = data;
					authenticate(token, () => {
						props.closeModal();
					})
				}
			})
	}

	const handleChange = name => e => {
		let value = e.target.value;

		if (name === "photo") {
			value = e.target.files[0];
			setPhoto(URL.createObjectURL(value));
			userData.set("fileSize", e.target.files[0].size)
		}

		userData.set(name, value);
		setUser({ ...user, [name]: value })
	}

	const { name, email, about, password } = user;

	let photoUrl;
	if (photo !== undefined) {
		photoUrl = photo;
	} else {
		photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`;
	}

	return (
		<div>
			<Modal.Body>

				<div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
					{error}
				</div>

				<Form>
					<Form.Group className="d-flex flex-column">
						<img style={{ height: "130px", width: "130px" }} onError={img => img.target.src = DefaultAvatar}
							className="rounded-circle align-self-center" src={photoUrl} alt={user.name} />
						<Form.Label>Foto de perfil</Form.Label>
						<Form.Control type="file" accept="image/*" onChange={handleChange("photo")}></Form.Control>
						<Form.Label>Nome</Form.Label>
						<Form.Control type="text" value={name} onChange={handleChange("name")}></Form.Control>
						<Form.Label>E-mail</Form.Label>
						<Form.Control type="text" value={email} onChange={handleChange("email")}></Form.Control>
						<Form.Label>Descrição</Form.Label>
						<Form.Control value={about} style={{ resize: 'none' }} rows={1} as="textarea" onChange={handleChange("about")}></Form.Control>
						<Form.Label>Senha</Form.Label>
						<Form.Control type="password" value={password} onChange={handleChange("password")}></Form.Control>
					</Form.Group>
				</Form>

			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => props.closeModal()} className="btn-sm" variant="secondary">Fechar</Button>
				<DeleteButton />
				<Button onClick={handleSubmit} className="btn-sm" variant="success">Salvar alterações</Button>
			</Modal.Footer>
		</div>
	)
}
