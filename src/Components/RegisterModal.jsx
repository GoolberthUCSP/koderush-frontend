import { createSignal } from "solid-js";

const inputFields = [
    { id: 'registerUsername', label: 'Username', type: 'text', requiredField: true },
    { id: 'registerName', label: 'Name', type: 'text', requiredField: true },
    { id: 'registerPassword', label: 'Password', type: 'password', requiredField: true },
    { id: 'registerEmail', label: 'Email', type: 'email', requiredField: true },
    { id: 'registerLocation', label: 'Location', type: 'text', requiredField: true },
    { id: 'registerBio', label: 'Bio', type: 'textarea', requiredField: false },
];

function RegisterModal(props) {
    const { show, onClose } = props;
    const [showPassword, setShowPassword] = createSignal(false);

    const handleRegister = () => {
        const inputs = document.querySelectorAll('#RegisterModal input, #RegisterModal textarea');
        let allFilled = true;
        inputs.forEach(input => {
            if (!input.value && input.required) {
                allFilled = false;
            }
        });
        if (!allFilled) {
            const registerError = document.getElementById('registerError');
            if (registerError) {
                registerError.style.display = 'block';
            }
            setTimeout(() => {
                if (registerError) {
                    registerError.style.display = 'none';
                }
            }, 3000);
            return;
        }
        onClose();
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword());
        const passwordInput = document.getElementById('registerPassword');
        if (passwordInput) {
            passwordInput.type = showPassword() ? 'text' : 'password';
        }
    }

    return (
        <div class={`modal fade ${show() ? 'show' : ''}`} 
             style={{ display: show() ? 'block' : 'none' }} 
             id="RegisterModal" 
             tabindex="-1" 
             aria-labelledby="RegisterModalLabel" 
             >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="RegisterModalLabel">Register</h5>
                        <button type="button" class="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div class="modal-body">
                        {inputFields.map(field => (
                            <>
                            <div class="mb-3">
                                <label for={field.id} class="form-label">{field.label} {field.requiredField ? '(*)' : ''}</label>
                                {field.type === 'textarea' ? 
                                    (<textarea class="form-control" id={field.id} rows="4" required={field.requiredField}></textarea>) : 
                                    (<input type={field.type} class="form-control" id={field.id} required={field.requiredField} />)}
                            </div>
                            {field.id === 'registerPassword' ? (<div class="form-check mb-3">
                                    <input type="checkbox" class="form-check-input" id="showPassword" onChange={handleShowPassword} />
                                    <label class="form-check-label" for="showPassword">Show Password</label>
                                </div>) : null}
                            </>
                        ))}
                        <div class="alert alert-warning" role="alert" id="registerError" style={{ display: 'none' }}>
                            <i class="bi bi-exclamation-triangle-fill p-2"></i>
                            Please, fill in all fields!
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" class="btn btn-primary" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterModal;