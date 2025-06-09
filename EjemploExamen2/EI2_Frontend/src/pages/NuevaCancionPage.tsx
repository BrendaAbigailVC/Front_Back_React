import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Cancion } from "../components/CancionesItem"

const URL = "http://localhost:5000"

const NuevaCancionPage = () => {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState("")
    const [artista, setArtista] = useState("")
    const [genero, setGenero] = useState("")

    const nombreOnChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
        setNombre(evt.currentTarget.value)
    }
    const artistaOnChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
        setArtista(evt.currentTarget.value)
    }    
    const generoOnChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
        setGenero(evt.currentTarget.value)
    }

    const guardarCancionHandler = async () => {
        const nuevaCancion: Cancion = {
            nombre,
            artista,
            genero
        }

        try{
            await fetch(`${URL}/canciones   `, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevaCancion)
            })
            navigate("/")
        } catch (error) {
            console.error("Error al guardar la canción:", error)
        }
    }
    return (
        <div className="container">
            <h1>Nueva Cancion</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" value={nombre} onChange={nombreOnChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="artista" className="form-label">Artista</label>
                    <input type="text" className="form-control" id="artista" value={artista} onChange={artistaOnChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="genero" className="form-label">Genero</label>
                    <input type="text" className="form-control" id="genero" value={genero} onChange={generoOnChange}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={guardarCancionHandler}>Guardar</button>
            </form>
        </div>
    )

}

export default NuevaCancionPage