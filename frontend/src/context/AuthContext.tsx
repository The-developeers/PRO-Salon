import { createContext, useState, ReactNode } from "react";
import { loginRequest } from "../api/auth";

interface User {
	_id: string;
	nome: string;
	email: string;
	role: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [ user, setUser ] = useState<User | null>(() => {
		const saved = localStorage.getItem('user')
		return saved ? JSON.parse(saved) : null
	})

	const [ token, setToken ] = useState<string | null>(() => {
		return localStorage.getItem('token')
	})

	async function login(email: string, password: string) {
		const { token, user } = await loginRequest(email, password)

		setUser(user)
		setToken(token)

		localStorage.setItem('user', JSON.stringify(user))
		localStorage.setItem('token', token)
	}

	function logout() {
		setToken(null)
		setUser(null)
		localStorage.removeItem('token')
		localStorage.removeItem('user')
	}

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}