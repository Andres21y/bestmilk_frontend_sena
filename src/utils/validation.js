export const verifyEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!regex.test(email)) return "Invalid email format";
    return null;
};

export const verifyPassword = (password) => {
    // Al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) return "Password is required";
    if (password.length < 8) return "It must have at least 8 characters";
    if (!regex.test(password)) return "It must include uppercase letters, lowercase letters, numbers, and special characters";
    return null;
};

export const verifyNumbers = (value) => {
    if (!/^\d+$/.test(value)) return "Only numbers are allowed";
    return null;
};

export const verifyTextOnly = (text) => {
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(text)) return "Only letters are allowed";
    return null;
};