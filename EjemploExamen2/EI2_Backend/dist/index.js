"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_1 = require("./data");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((0, cors_1.default)());
app.use(express_1.default.static("assets"));
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor web iniciado en ${PORT} ...`);
});
app.get("/", (req, resp) => {
    resp.send("Endpoint raiz");
});
app.get("/canciones", (req, resp) => {
    const canciones = data_1.listaCanciones;
    resp.json(canciones);
});
app.post("/canciones", (req, resp) => {
    const cancion = req.body;
    const canciones = data_1.listaCanciones;
    if (cancion.nombre == undefined || cancion.artista == undefined || cancion.genero == undefined) {
        resp.status(400).json({
            msg: "Debe enviar campo"
        });
        return;
    }
    canciones.push({
        id: new Date().getTime(),
        nombre: cancion.nombre,
        artista: cancion.artista,
        genero: cancion.genero
    });
    resp.json({
        msg: ""
    });
});
