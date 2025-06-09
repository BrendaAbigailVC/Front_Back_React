import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()

const PORT = 5000

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(cors())

interface Fecha {
    fecha: string;
    hora: string;
}

const visitas : Fecha[] = []

app.get('/visit', (req: Request, res: Response) => {
    const fecha =  new Date().toISOString().split("T")[0]
    const hora = new Date().toTimeString().split(" ")[0]

    visitas.push({fecha, hora})

    res.json({
        msg: "Gracias por visitar el sitio",
        totalVisitas: visitas.length
    })
});

app.get('/visits', (req: Request, res: Response) => {
    res.json({visitas})
});

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en puerto ${PORT}`)
})

/*
Esto crea una lista (array) llamada visitas en memoria, que contiene objetos de tipo Fecha con dos campos: fecha y hora.
Cada vez que alguien visita el endpoint /visit, se agrega un nuevo objeto a esta lista. 
*/
