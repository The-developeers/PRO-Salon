export async function loginRequest(email: string, password: string) {
	const res = await fetch('http://localhost:5000/api/v1/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password })
	})

	const responseData = await res.json()

	if (!res.ok) {
		throw new Error(responseData.message || 'Erro ao fazer login')
	}

	return responseData.data
}