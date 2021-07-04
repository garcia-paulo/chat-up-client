import React, { useEffect, useState, useCallback } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { getMessagesFromConversation } from '../api/conversationApi';
import { useAuth } from './contexts/AuthContext';
import { useConversation } from './contexts/ConversationContext';
import io from 'socket.io-client';

export default function OpenConversation() {
	const [text, setText] = useState("");
	const [messages, setMessages] = useState([]);
	const [socket, setSocket] = useState();

	const setRef = useCallback(node => {
		if (node) {
			node.scrollIntoView({ smooth: true })
		}
	}, [])

	const { selectedConversation, sendMessage } = useConversation();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		const token = isAuthenticated().token;

		setSocket(io(`${process.env.REACT_APP_API_URL}`, { query: { id: selectedConversation } }));

		getMessagesFromConversation(selectedConversation, token)
			.then(data => {
				if (data.error) {
					console.log(data.error);
				}
				setMessages(data);
			})

	}, [selectedConversation])

	useEffect(() => {
		if (socket == null) {
			return;
		}

		socket.on('receive-message', message => { setMessages(messages => ([...messages, message])) })
		return () => { socket.off('receive-message') }
	}, [socket])

	const addMessage = (message) => {
		socket.emit('send-message', message);
		setMessages([...messages, message]);
	}

	const handleSubmit = e => {
		e.preventDefault();
		sendMessage(selectedConversation, text);
		addMessage({ text, sender: isAuthenticated().user._id, created: new Date() })
		setText("");
	}

	const handleKeyPress = e => {
		if (e.key === "Enter" && !e.shiftKey) {
			if (text.trim()) {
				handleSubmit(e);
			}
		}
	}

	return (
		<div className="d-flex flex-column flex-grow-1">
			<div className="flex-grow-1 overflow-auto">
				<div className="d-flex flex-column align-items-start justify-content-end px-3">
					{messages.map((message, i) => {
						const authenticated = isAuthenticated() && isAuthenticated().user._id
						return (
							<div key={i} className={`my-1 d-flex flex-column
							${message.sender === authenticated && "align-self-end"}`}
								ref={messages.length - 1 === i ? setRef : null}>
								<div className={`rounded px-2 py-1
								${message.sender === authenticated ? `bg-primary text-white` : `border`}`}>
									{message.text}
								</div>
								<div className={`text-muted small
								${message.sender === authenticated && "align-self-end"}`}>
									{new Date(message.created).toLocaleDateString()}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="m-2">
					<InputGroup>
						<FormControl as="textarea" required value={text} style={{ height: "75px", resize: "none" }}
							onChange={e => setText(e.target.value)} placeholder="Escreva aqui sua mensagem..."
							onKeyPress={handleKeyPress} />
						<InputGroup.Append>
							<Button type="submit" style={{ height: "75px", width: "70px", borderRadius: "0px 4px 4px 0px" }}><i className="fa fa-paper-plane" style={{ fontSize: "38px" }} /></Button>
						</InputGroup.Append>
					</InputGroup>
				</Form.Group>
			</Form>
		</div>
	)
}
