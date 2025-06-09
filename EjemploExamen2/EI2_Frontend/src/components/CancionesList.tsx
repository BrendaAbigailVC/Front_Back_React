import CancionesItem, { Cancion } from "./CancionesItem"

export interface CancionesList{
    listaCanciones: Cancion[]
}

const CancionesList = (props: CancionesList) => {
    return (
        <div className="container">
            <div className="row">
                {
                    props.listaCanciones.map((elemento: Cancion) => {
                        return <CancionesItem nombre={elemento.nombre} genero={elemento.genero} artista={elemento.artista}></CancionesItem>
                    })
                }
            </div>
        </div>
    )
}
export default CancionesList