export interface Cancion {
    id?: number,
    nombre: string,
    genero: string,
    artista: string
}

const CancionesItem = (props: Cancion) => {
    return (
        <div className="col-4 border p-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.nombre}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{props.genero}</h6>
                    <p className="card-text">{props.artista}</p>
                </div>
            </div>
        </div>

    )
}

export default CancionesItem