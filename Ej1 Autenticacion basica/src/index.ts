import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
const PORT = 5000
const TOKEN = "abc123"

const verificarToken = (tok : string | undefined) => {
    if (tok == undefined) {
        return false
    }

    return tok == TOKEN
}

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors())

app.post('/login', (req: Request, resp: Response) => {

    resp.json({
        token : TOKEN
    })
});

app.get('/profile', (req: Request, resp: Response) => {
    const token = req.headers.authorization
    if(verificarToken(token)){
        resp.send("Token valido")
    }else{
        resp.status(403).json({
            msg : "Token invalido"
        })
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`)
})