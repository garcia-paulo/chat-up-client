import React, { useState } from 'react'
import DefaultAvatar from '../images/avatar.png'
import { addFavorite, removeFavorite } from '../api/userApi'
import { findOrCreateConversation } from '../api/conversationApi'
import { Modal, Button } from 'react-bootstrap';
import { useConversation } from './contexts/ConversationContext';
import { useAuth } from './contexts/AuthContext';

export default function UserContact(props) {
	const { user, isFav, reload } = props;
	const [hover, setHover] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const { reloadConversations, setSelectedConversation } = useConversation();

	const { isAuthenticated } = useAuth();

	let photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`;

	const addFav = e => {
		const userId = isAuthenticated().user._id;
		const favId = user._id;
		const token = isAuthenticated().token;

		addFavorite(userId, favId, token)
			.then(data => {
				if (data.error) {
					console.log(data.error);
				}
				reload();
				setModalOpen(false);
			});
		e.stopPropagation();
	}

	const removeFav = e => {
		const userId = isAuthenticated().user._id;
		const favId = user._id;
		const token = isAuthenticated().token;

		removeFavorite(userId, favId, token)
			.then(data => {
				if (data.error) {
					console.log(data.error);
				}
				reload();
				setModalOpen(false);
			});
		e.stopPropagation();
	}

	const chatWith = () => {
		const userId = isAuthenticated().user._id;
		const contactId = user._id;
		const token = isAuthenticated().token;

		findOrCreateConversation(userId, contactId, token)
			.then(data => {
				if (data.error) {
					console.log(data.error);
				}
				setModalOpen(false);
				reloadConversations();
				setSelectedConversation(data);
			})

	}

	return (
		<div>
			<div onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false) }}
				onClick={() => { setModalOpen(true) }}
				style={hover ? { backgroundColor: "#0d6efd", cursor: "pointer", height: "70px", color: "#ffffff" } : { backgroundColor: "#ffffff", cursor: "default", height: "70px" }}
				className="p-2 border-top d-flex justify-content-start">
				<div style={{ marginRight: "7px" }}>
					<img style={{ height: "47px", width: "47px" }} onError={img => img.target.src = DefaultAvatar}
						className="rounded-circle" src={photoUrl} alt={user.name} />
				</div>
				<div className="w-100">
					<span className="align-top mb-1">
						{user.name}
					</span> <br />
					{hover ? (
						<div>
							<span className="small" style={{ color: "#ffffff" }}>
								{user.about.length > 20 ? (user.about.substring(0, 21) + "...") : (user.about)}
							</span>
							<span onClick={isFav ? removeFav : addFav} style={{ float: 'right', color: "#ffffff" }}>
								{isFav ? (
									<i className="fa fa-star"></i>
								) : (
									<i className="fa fa-star-o"></i>
								)}
							</span>
						</div>
					) : (
						<div>
							<span className="text-muted small">
								{user.about.length > 20 ? (user.about.substring(0, 21) + "...") : (user.about)}
							</span>
							<span onClick={isFav ? removeFav : addFav} className="text-primary" style={{ float: 'right' }}>
								{isFav ? (
									<i className="fa fa-star"></i>
								) : (
									<i className="fa fa-star-o"></i>
								)}
							</span>
						</div>
					)
					}

				</div >
			</div >

			<Modal onHide={() => { setModalOpen(false) }} show={modalOpen}>
				<Modal.Body className="d-flex flex-column align-items-center">
					<img style={{ height: "130px", width: "130px" }} onError={img => img.target.src = DefaultAvatar}
						className="rounded-circle" src={photoUrl} alt={user.name} />
					<div className="lead w-100 d-flex flex-column align-items-center">
						<h2>{user.name}</h2>
						<p>{user.email}</p>
						<p className="text-muted">{`Membro desde ${new Date(user.created).toLocaleDateString()}`}</p>
						<h5>{user.about}</h5>
					</div>
				</Modal.Body>
				<Modal.Footer>
					{isFav ? (
						<Button variant="danger" onClick={removeFav}>Remover dos favoritos</Button>
					) : (
						<Button variant="success" onClick={addFav}>Adicionar aos favoritos</Button>
					)}
					<Button onClick={chatWith}>{`Conversar com ${user.name}`}</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
