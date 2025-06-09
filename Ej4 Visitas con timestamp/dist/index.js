"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((0, cors_1.default)());
const visitas = [];
app.get('/visit', (req, res) => {
    const fecha = new Date().toISOString().split("T")[0];
    const hora = new Date().toTimeString().split(" ")[0];
    visitas.push({ fecha, hora });
    res.json({
        msg: "Gracias por visitar el sitio",
        totalVisitas: visitas.length
    });
});
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
