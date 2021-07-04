export const signup = user => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/create`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		})
}

export const getContacts = (userId, token, query = '') => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/contacts/${userId}/?search=${query}`, {
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
		.catch(err => {
			console.log(err);
		})
}

export const getFavorites = (userId, token, query = '') => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/favorites/${userId}/?search=${query}`, {
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
		.catch(err => {
			console.log(err);
		})
}

export const edit = (userId, token, user) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/update/${userId}`, {
		method: "PUT",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${token}`
		},
		body: user
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
}

export const remove = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/delete/${userId}`, {
		method: "DELETE",
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

export const addFavorite = (userId, favId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/favorite/${userId}`, {
		method: "PUT",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ favId })
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
}

export const removeFavorite = (userId, favId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/unfavorite/${userId}`, {
		method: "PUT",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ favId })
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
}