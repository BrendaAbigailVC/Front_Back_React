import { useEffect, useState } from "react"
import type { Product } from "../components/ListaProductos"
import ListaProducts from "../components/ListaProductos"
import Formulario from "../components/Formulario"
import EditModal from "../components/EditModal"
import BuscadorProducto from "../components/BuscadorProducto";
import FiltroCategoria from "../components/FiltroCategoria";
import EliminarPorNombre from "../components/EliminarPorNombre";
const URL = "http://localhost:5000"

const MainPage = () => {
    const [listaProducts, setListaProducts] = useState<Product[]>([])
    const [productoEditar, setProductoEditar] = useState<Product | null>(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        httpObteneProductsAsyncAwait()
    }, [])

    //Mostrar todos los productos (GET /products)
    const httpObteneProductsAsyncAwait = async () => {
        try {
            const resp = await fetch(`${URL}/products`)
            const data = await resp.json()
            setListaProducts(data)
        } catch (error) {
            console.error(error)
        }
    }

    //Crear un producto (POST /products)
    const agregarProducto = async (producto: { name: string; price: number; category: string }) => {
        await httpGuardarProducto(producto)
        await httpObteneProductsAsyncAwait()
    }

    const httpGuardarProducto = async (product: Product) => {
        const resp = await fetch(`${URL}/products`, {
            method: "post",
            body: JSON.stringify(product),
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await resp.json()
        console.log(data);
    }


    //Editar producto (PUT /products/:id)
    const guardarProductoEditado = async (productoActualizado: Product) => {
        try {
            const resp = await fetch(`${URL}/products/${productoActualizado.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productoActualizado)
            })
            const data = await resp.json()
            console.log(data)
            cerrarModal()
            await httpObteneProductsAsyncAwait()
        } catch (error) {
            console.error(error)
        }
    }

    const editarProducto = (producto: Product) => {
        setProductoEditar(producto)
        setShowModal(true)
    }

    const cerrarModal = () => {
        setShowModal(false)
        setProductoEditar(null)
    }

    //Eliminar producto por ID (DELETE /products/:id)
    const eliminarProducto = async (id?: number) => {
        if (!id) return;
        try {
            const resp = await fetch(`${URL}/products/${id}`, {
                method: "DELETE"
            });
            const data = await resp.json();
            console.log(data);
            await httpObteneProductsAsyncAwait();
        } catch (error) {
            console.error(error);
        }
    };

    //Eliminar productos por nombre (DELETE /products/by-name/:name)
    const eliminarProductosPorNombre = async (name: string) => {
        try {
            const resp = await fetch(`${URL}/products/by-name/${name}`, {
                method: "DELETE"
            });
            const data = await resp.json();
            console.log(data);
            await httpObteneProductsAsyncAwait();
        } catch (error) {
            console.error(error);
        }
    };

    //Buscar producto por nombre y precio (GET /products/search)
    const buscarPorNombreYPrecio = async (name: string, maxPrice: number) => {
        try {
            const resp = await fetch(`${URL}/products/search?name=${name}&maxPrice=${maxPrice}`);
            const data = await resp.json();
            setListaProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    //Filtrar por categoría (GET /products/by-category)
    const filtrarPorCategoria = async (category: string) => {
        try {
            const resp = await fetch(`${URL}/products/by-category?category=${category}`);
            const data = await resp.json();
            setListaProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    return <div className="container">
        <div className="row">
            <div className="col">
                <BuscadorProducto onBuscar={buscarPorNombreYPrecio} />
                <FiltroCategoria onFiltrar={filtrarPorCategoria} />
                <EliminarPorNombre onEliminar={eliminarProductosPorNombre} />
                <Formulario agregar={agregarProducto} />
            </div>

            <div className="col">
                <ListaProducts
                    products={listaProducts}
                    onDelete={eliminarProducto}
                    onEdit={editarProducto}
                />
            </div>
        </div>
        
        <EditModal
            producto={productoEditar}
            show={showModal}
            onClose={cerrarModal}
            onSave={guardarProductoEditado}
        />
    </div>
}

export default MainPage