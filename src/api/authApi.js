export const login = user => {
	return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
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

// export const logout = (next) => {
//     if (typeof window != "undefined") {
//         localStorage.removeItem("tkn");
//     }
//     next(true);
//     return fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
//         method: "GET"
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }

export const logout = () => {
	return fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
		method: "GET"
	})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
		})
}

// export const authenticate = (tkn, next) => {
//     if (typeof window != "undefined") {
//         localStorage.setItem("tkn", JSON.stringify(tkn));
//         next();
//     }
// }

// export const isAuthenticated = () => {
//     if (typeof window == "undefined") {
//         return false;
//     }

//     if (localStorage.getItem("tkn")) {
//         return JSON.parse(localStorage.getItem("tkn"));
//     } else {
//         return false;
//     }
// }