import React from 'react'
import UserConversation from './UserConversation';
import { useConversation } from './contexts/ConversationContext';
import { useAuth } from './contexts/AuthContext';

export default function Conversations() {
	const { conversations, selectedConversation, reloadConversations, setSelectedConversation } = useConversation();

	const { isAuthenticated } = useAuth();

	return (
		<div>
			{conversations.map((conversation, i) => {
				let user;
				conversation.members.forEach(element => {
					if (element._id._id !== isAuthenticated().user._id) {
						user = element._id;
						user.conversation = conversation._id;
					}
				});
				let selected = false;
				if (selectedConversation === user.conversation) {
					selected = true;
				}
				return (
					<div key={i} >
						<UserConversation user={user} reload={reloadConversations} selected={selected} selectConversation={setSelectedConversation} />
					</div>
				)
			})}
		</div>
	)
}
