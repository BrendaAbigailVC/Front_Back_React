import { useNavigate } from "react-router-dom"
import CancionesList from "../components/CancionesList"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { Cancion } from "../components/CancionesItem"

const URL = "http://localhost:5000"

const CancionesPage = () => {
    const navigate = useNavigate()
    const [listaCanciones, setListaCanciones] = useState<Cancion[]>([])

    const httpObtenerCanciones = async () => {
        try {
            const resp = await fetch(`${URL}/canciones`)
            const data = await resp.json()
            setListaCanciones(data)
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        httpObtenerCanciones()
    }, [])
    
    return (
        <div className="container">
            <h1>Canciones</h1>
            <button className="btn btn-primary" 
            onClick={() => {
                navigate("/nuevaCancion")
            }
            }>Nueva Cancion</button>
            <CancionesList listaCanciones={listaCanciones}/>
            <Footer />
        </div>
    )
}

export default CancionesPage