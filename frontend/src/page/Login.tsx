import '../style/Login.css'
import Logo from '../../public/img/Logo.png'
import IconEmail from '../../public/img/IconEmail.png'
import IconCadeado from '../../public/img/IconCadeado.png'

export default function LoginPage() {
	return (
		<div className="login-container">
			<div className="login-card">
				<div className="left-section">
					<img src={Logo} alt="Logo Pro Salon" width={144} height={144} loading="lazy"/>
					<h1 className="left-title">Bem-Vindo!</h1>
					<p className="left-subtitle">Sua gestão inteligente para um salão mais eficiente!</p>
				</div>
				<div className="right-section">
					<h2 className="form-title">Acesse sua conta</h2>
					<div className="input-group">
						<img src={IconEmail} alt="Icone Email" width={32} height={32} loading="lazy"/>
						<input type="email" placeholder="E-mail"/>
					</div>
					<div className="input-group">
						<img src={IconCadeado} alt="Icone Cadeado" width={32} height={32} loading="lazy"/>
						<input type="password" placeholder="Senha"/>
					</div>

					<button className="btn-login">Entrar</button>

					<p className="register-text">Ainda não tem cadastro?
						<a href="#">Cadastre-se</a>
					</p>
				</div>
			</div>
		</div>
	)
}