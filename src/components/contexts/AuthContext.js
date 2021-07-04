import React, { createContext, useState, useContext } from 'react'
import { logout } from '../../api/authApi'

const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [token, setToken] = useState(false);

	const signOut = (next) => {
		setToken(false);
		next();
		logout();
	}

	const authenticate = (tkn, next) => {
		setToken(tkn);
		next();
	}

	const isAuthenticated = () => {
		if (token) {
			return token;
		} else {
			return false;
		}
	}

	return (
		<AuthContext.Provider value={{
			signOut,
			authenticate,
			isAuthenticated
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const { signOut, authenticate, isAuthenticated } = useContext(AuthContext);
	return { signOut, authenticate, isAuthenticated };
}