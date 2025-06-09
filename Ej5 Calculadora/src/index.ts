import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()

const PORT = 5000

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
   extended: true
}))

app.use(cors())

app.get('/add/:a/:b', (req: Request, res: Response) => {
   const a = Number(req.params.a)
   const b = Number(req.params.b)
   if (isNaN(a) || isNaN(b)) {
      res.status(400).json({ msg: "Parámetros inválidos" });
      return
   }
   const result = a + b
   res.json(result)
});

app.get('/subtract/:a/:b', (req: Request, res: Response) => {
   const a = Number(req.params.a)
   const b = Number(req.params.b)

   const result = a - b
   res.json(result)
});

app.get('/multiply/:a/:b', (req: Request, res: Response) => {
   const a = Number(req.params.a)
   const b = Number(req.params.b)

   const result = a * b
   res.json(result)
});

app.get('/divide/:a/:b', (req: Request, res: Response) => {
   const a = Number(req.params.a)
   const b = Number(req.params.b)

   const result = a / b

   if (a === 0) {
      res.json(0)
      return
   }

   if (b === 0) {
      res.status(400).json({ msg: "No se puede dividir entre 0" })
      return
   }

   res.json(result)
});

app.listen(PORT, () => {
   console.log(`Servidor iniciado en puerto ${PORT}`)
})

