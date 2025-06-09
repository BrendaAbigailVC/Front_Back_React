"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5001;
const TOKEN = "abc123";
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const users = [];
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (typeof username !== "string" || username.trim().length < 3) {
        res.status(400).json({ msg: "Nombre de usuario inválido" });
        return;
    }
    if (typeof password !== "string" || password.trim().length < 4) {
        res.status(400).json({ msg: "Contraseña inválida" });
        return;
    }
    if (username === "admin" && password === "1234") {
        res.json({ token: TOKEN });
    }
    else {
        res.status(401).json({ msg: "Credenciales incorrectas" });
    }
});
app.get('/profile', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(403).json({ msg: "No se proporcionó el token" });
        return;
    }
    const token = authHeader.split(" ")[1]; //Se usa solo si viene el token de la forma barer token
    if (token === TOKEN) {
        res.send("Token válido. Acceso autorizado al perfil.");
    }
    else {
        res.status(403).json({ msg: "Token inválido" });
    }
});
const validateEmailAndPassword = (email, password) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push("Correo electrónico inválido");
    }
    if (password.length < 8) {
        errors.push("La contraseña debe tener al menos 8 caracteres");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("La contraseña debe contener al menos una letra mayúscula");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("La contraseña debe contener al menos una letra minúscula");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("La contraseña debe contener al menos un número");
    }
    return errors;
};
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || typeof username !== "string" || username.trim() === "") {
        res.status(400).json({ msg: "El username es obligatorio y no puede estar vacío" });
        return;
    }
    if (!email || !password) {
        res.status(400).json({ msg: "Faltan campos obligatorios" });
        return;
    }
    const errors = validateEmailAndPassword(email, password);
    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }
    // Verificar que el usuario no exista ya por email o username
    const userExists = users.some(u => u.email === email || u.username === username);
    if (userExists) {
        res.status(409).json({ msg: "El correo o username ya están registrados" });
        return;
    }
    users.push({ username, email, password });
    res.status(201).json({ msg: "Usuario registrado correctamente", user: { username, email } });
});
app.get('/users', (req, res) => {
    res.json(users.map(u => ({ username: u.username, email: u.email })));
});
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
