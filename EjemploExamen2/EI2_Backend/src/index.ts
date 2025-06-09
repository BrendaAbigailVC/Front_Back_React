import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { listaCanciones, Cancion } from "./data"
import bodyParser from "body-parser"
import cors from "cors"

dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())
app.use(express.static("assets"))
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Servidor web iniciado en ${PORT} ...`)
})

app.get("/", (req : Request, resp : Response) => {
    resp.send("Endpoint raiz")
})

app.get("/canciones", (req: Request, resp: Response) => {
    const canciones = listaCanciones
    resp.json(canciones)
})

app.post("/canciones", (req: Request, resp: Response) => {
    const cancion = req.body
    const canciones = listaCanciones
    if (cancion.nombre == undefined || cancion.artista == undefined || cancion.genero == undefined){
        resp.status(400).json({
            msg : "Debe enviar campo"
        })
        return
    }

    canciones.push({
        id: new Date().getTime(),
        nombre: cancion.nombre,
        artista: cancion.artista,
        genero: cancion.genero
    })

    resp.json({
        msg: ""
    })
})