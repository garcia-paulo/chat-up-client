import React, { useState } from 'react'
import { disableConversation } from '../api/conversationApi';
import DefaultAvatar from '../images/avatar.png'
import { useAuth } from './contexts/AuthContext';

export default function UserConversation({ user, reload, selected, selectConversation }) {
	const [hover, setHover] = useState(false);

	const { isAuthenticated } = useAuth();

	let photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`;

	const eraseConversation = e => {
		const chatId = user.conversation;
		const token = isAuthenticated().token;

		disableConversation(chatId, token)
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				}
				selectConversation(false);
				reload(true);
			})
		e.stopPropagation();
	}

	return (
		<div onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false) }} onClick={() => { selectConversation(user.conversation) }}
			style={hover || selected ? { backgroundColor: "#0d6efd", cursor: "pointer", height: "70px", color: "#ffffff" } : { backgroundColor: "#ffffff", cursor: "default", height: "70px" }}
			className="p-2 border-top d-flex justify-content-start">
			<div style={{ marginRight: "7px" }}>
				<img style={{ height: "47px", width: "47px" }} onError={img => img.target.src = DefaultAvatar}
					className="rounded-circle" src={photoUrl} alt={user.name} />
			</div>
			<div className="w-100">
				<span className="align-top mb-1">
					{user.name}
				</span> <br />
				{hover || selected ? (
					<div>
						<span className="small" style={{ color: "#ffffff" }}>
							{user.about.length > 20 ? (user.about.substring(0, 21) + "...") : (user.about)}
						</span>
						<span onClick={eraseConversation} className="text-danger" style={{ float: 'right' }}>
							<i className="fa fa-trash"></i>
						</span>
					</div>
				) : (
					<div>
						<span className="text-muted small">
							{user.about.length > 20 ? (user.about.substring(0, 21) + "...") : (user.about)}
						</span>
						<span onClick={eraseConversation} className="text-danger" style={{ float: 'right' }}>
							<i className="fa fa-trash"></i>
						</span>
					</div>
				)
				}

			</div >
		</div >
	)
}
