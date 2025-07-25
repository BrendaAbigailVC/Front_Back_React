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
app.get('/add/:a/:b', (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const result = a + b;
    res.json(result);
});
app.get('/subtract/:a/:b', (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const result = a - b;
    res.json(result);
});
app.get('/multiply/:a/:b', (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const result = a * b;
    res.json(result);
});
app.get('/divide/:a/:b', (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const result = a / b;
    res.json(result);
});
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
