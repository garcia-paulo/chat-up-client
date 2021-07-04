import React, { createContext, useState, useContext } from 'react'
import { addMessage, getConversations } from '../../api/conversationApi'
import { useAuth } from './AuthContext';

const ConversationContext = createContext();

export default function ConversationProvider({ children }) {
	const [conversations, setConversation] = useState([]);
	const [reload, setReload] = useState(true);
	const [selectedConversation, setSelectedConversation] = useState();

	const { isAuthenticated } = useAuth();

	const reloadConversations = () => {
		setReload(true);
	}

	if (reload) {
		const userId = isAuthenticated() && isAuthenticated().user._id;
		const token = isAuthenticated() && isAuthenticated().token;
		setReload(false);

		if (isAuthenticated()) {
			getConversations(userId, token)
				.then(data => {
					if (data.error) {
						console.log(data.error);
					}

					setConversation(data);
				})
		}
	}

	const sendMessage = (conversation, text) => {
		const sender = isAuthenticated().user._id;
		const token = isAuthenticated().token;

		addMessage(conversation, text, sender, token)
			.then(data => {
				if (data.error) {
					console.log(data.error)
				}
			})
	}

	return (
		<ConversationContext.Provider value={{
			conversations,
			reloadConversations,
			selectedConversation,
			setSelectedConversation,
			sendMessage
		}}>
			{children}
		</ConversationContext.Provider>
	)
}

export const useConversation = () => {
	const { conversations, selectedConversation, reloadConversations, setSelectedConversation, sendMessage } = useContext(ConversationContext);
	return { conversations, selectedConversation, reloadConversations, setSelectedConversation, sendMessage };
}