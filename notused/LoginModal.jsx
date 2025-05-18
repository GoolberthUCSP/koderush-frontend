import { useAuthContext } from "../Contexts/AuthContext";
import { createSignal } from "solid-js";

function LoginModal(props) {
    const { login } = useAuthContext();
    const { show, onClose } = props;
    const [showPassword, setShowPassword] = createSignal(false);

    const handleLogin = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (!username || !password) {
            const loginError = document.getElementById('loginError');
            if (loginError) {
                loginError.style.display = 'block';
            }
            setTimeout(() => {
                if (loginError) {
                    loginError.style.display = 'none';
                }
            }, 3000);
            return;
        }
        // Perform login logic here: Get user data from API and call login function
        console.log('Logging in with:', { username, password });
        const userData = {
            username: "kingpig_official", // No editable
            name: "Rey Cerdito",
            profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ9HmGyLuw5L-fd0uZVq9C2mPI4V7GKyd6E2DIVz6-xaHHVUtmmBiCOo1OytaYR21Tdpc&usqp=CAU",
            location: "Isla Cerdito",
            email: "king.pig@piggyisland.com",
            bio: "¡Mwahahaha! Soy el magnífico Rey Cerdito de Isla Cerdito. Mi vida consiste en dar órdenes a mis súbditos, idear planes (a veces fallidos) para robar los huevos de esos plumíferos enfadados y, por supuesto, ¡disfrutar de una buena siesta real!",
        };
        login(userData);
        // Close the modal after login
        onClose();
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword());
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.type = showPassword() ? 'text' : 'password';
        }
    }

    return (
        <div class={`modal fade ${show() ? 'show' : ''}`} 
             style={{ display: show() ? 'block' : 'none' }} 
             id="loginModal" 
             tabindex="-1" 
             aria-labelledby="loginModalLabel" 
             >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginModalLabel">Login</h5>
                        <button type="button" class="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" />
                        </div>
                        <div class="form-check mb-3">
                            <input type="checkbox" class="form-check-input" id="registerShowPassword" onChange={handleShowPassword} />
                            <label class="form-check-label" for="showPassword">Show Password</label>
                        </div>
                        <div class="alert alert-warning" role="alert" id="loginError" style={{ display: 'none' }}>
                            <i class="bi bi-exclamation-triangle-fill p-2"></i>
                            Please, fill both username and password!
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" class="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;