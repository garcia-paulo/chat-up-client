import React from 'react';
import { useConversation } from '../contexts/ConversationContext';
import Menu from '../Menu';
import OpenConversation from '../OpenConversation';

export default function Main() {
	const { selectedConversation } = useConversation()

	return (
		<div className="d-flex" style={{ height: "100vh" }}>
			<Menu />
			{selectedConversation && <OpenConversation />}
		</div>
	)
}
