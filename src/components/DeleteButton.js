import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { remove } from '../api/userApi';
import { Redirect } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';


export default function DeleteButton() {
	const [openConfirmation, setOpenConfirmation] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const { isAuthenticated, signOut } = useAuth();

	const closeConfirmation = () => {
		setOpenConfirmation(false);
	}

	const deleteAccount = () => {
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;
		remove(userId, token)
			.then(data => {
				if (data.error) {
					console.log(data.error);
				} else {
					signOut(() => { setRedirect(true) });
				}
			})
	}

	if (redirect) {
		return <Redirect to="/" />
	}

	return (
		<div>
			<Button onClick={() => setOpenConfirmation(true)} className="btn-sm" variant="danger">Deletar conta</Button>

			<Modal centered backdrop="static" show={openConfirmation}>
				<Modal.Body >
					<h3>Tem certeza que deseja deletar sua conta?</h3>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={closeConfirmation} variant="secondary">Voltar</Button>
					<Button onClick={deleteAccount} variant="danger">Sim</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
