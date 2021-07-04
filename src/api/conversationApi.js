exports.findOrCreateConversation = (userId, contactId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/chat/with`, {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ users: [userId, contactId], members: [{ _id: userId }, { _id: contactId }] })
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
}

exports.getConversations = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/chat/all/${userId}`, {
		method: "GET",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
}

exports.disableConversation = (chatId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/chat/disable/${chatId}`, {
		method: "PUT",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
}

exports.addMessage = (chatId, text, sender, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/chat/add`, {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ chatId, text, sender })
	})
		.then(response => {
			return response.json()
		})
		.catch(err => console.log(err));
}

exports.getMessagesFromConversation = (chatId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/chat/messages/${chatId}`, {
		method: "GET",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			return response.json()
		})
		.catch(err => console.log(err));
}