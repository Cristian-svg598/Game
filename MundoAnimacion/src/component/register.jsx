import React, { useState } from "react";
import '../styles/register.css';



const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!name.trim()) newErrors.name = "El nombre es obligatorio.";

        if (!esEmailValido(email)) {
            newErrors.email = "Correo inválido. Usa un formato como ejemplo@correo.com";
        }

        if (!esTelefonoValido(phoneNumber)) {
            newErrors.phoneNumber = "Teléfono inválido. Ej: +34 600 123 456 o 600123456";
        }

        if (!esContrasenaSegura(password)) {
            newErrors.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Aquí iría el envío al backend
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Número de teléfono"
                />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </div>

            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar contraseña"
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>

            <button type="submit">Registrarse</button>
        </form>
    );
};

// Funciones de validación

function esContrasenaSegura(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function esTelefonoValido(telefono) {
    const regex = /^\+?\d{1,4}?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)*\d{3,4}[-.\s]?\d{3,4}$/;
    return regex.test(telefono);
}

export default Register;


// Validaciones

function configPassword(password, confirmedPassword) {
    if (!esContrasenaSegura(password)) {
        alert(`La contraseña debe tener al menos: 
- 8 caracteres
- Una letra mayúscula
- Una letra minúscula
- Un número
- Un carácter especial (como !@#$%^&*)`);
        return false;
    }
    if (password !== confirmedPassword) {
        alert('Las contraseñas no coinciden.');
        return false;
    }
    return true;
}

function esContrasenaSegura(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

function confirmEmail(email) {
    if (!esEmailValido(email)) {
        alert(`Email inválido. Asegúrate de usar un formato como ejemplo@ejemplo.com.`);
        return false;
    }
    return true;
}

function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function confirmTelefono(telefono) {
    if (!esTelefonoValido(telefono)) {
        alert(`Teléfono inválido. Ejemplos válidos:
- +34 600 123 456
- 600123456`);
        return false;
    }
    return true;
}

function esTelefonoValido(telefono) {
    const regex = /^\+?\d{1,4}?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)*\d{3,4}[-.\s]?\d{3,4}$/;
    return regex.test(telefono);
}
