export interface Product {
    id?: number
    name: string
    price: number
    category: string
}


interface ListaProductsProps {
    products: Product[]
    onDelete: (id?: number) => void,
    onEdit: (product: Product) => void,
}

const ListaProducts = ({ products, onDelete, onEdit }: ListaProductsProps) => {
    return <div>
        <ul className="list-group mt-4">
            {
                products.map((elemento: Product) => {
                    return <li key={elemento.id} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto" >
                            <h3>{elemento.name}</h3>
                            <p>Precio: {elemento.price}</p>
                            <p>Categoria: {elemento.category}</p>
                        </div>
                        <div>
                            <button
                                className="btn btn-warning me-2"
                                onClick={() => onEdit(elemento)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(elemento.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                })
            }
        </ul>
    </div>

}

export default ListaProducts