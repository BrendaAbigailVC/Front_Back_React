import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { Product, products } from "./data"
const app = express()

const PORT = 5000

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors())

//OBTENER PRODUCTOS
app.get('/products', (req: Request, res: Response) => {
    res.json(products)
});

//FILTRAR POR CATEGORIA
app.get('/products/by-category', (req: Request, res: Response) => {
    const category = (req.query.category as string)?.toLowerCase()

    if (!category) {
        res.status(400).json({ msg: "Categoría requerida" })
        return
    }

    const filtered = products.filter(p =>
        p.category.toLowerCase().includes(category)
    )
    if (filtered.length === 0) {
        res.status(404).json({ msg: "No se encontraron productos en esa categoría" })
        return
    }

    res.json(filtered)
})

//BUSCAR PRODUCTO POR NOMBRE Y MAXPRECIO
app.get('/products/search', (req: Request, res: Response) => {
    const name = (req.query.name as string)?.toLowerCase() || "";
    const maxPrice = parseFloat(req.query.maxPrice as string);

    if (isNaN(maxPrice)) {
        res.status(400).json({ msg: "Parámetro maxPrice inválido" });
        return;
    }

    const productosEncontrados: Product[] = products.filter(product =>
        product.name.toLowerCase().includes(name) && product.price <= maxPrice
    );

    res.json(productosEncontrados);
});


//BUSCAR PRODUCTOS POR ID
app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    let productoEncontrado: Product | null = null
    for (let product of products) {
        if (product.id.toString() == id) {
            productoEncontrado = product
        }
    }

    if (productoEncontrado == null) {
        res.status(400).json({
            msg: "Id incorrecto"
        })
        return
    }

    res.json(productoEncontrado)

});

//CREACION DE PRODUCTO
app.post('/products', (req: Request, res: Response) => {
    const { name, price, category } = req.body;

    // Validar campos
    if (!name || price === undefined || !category) {
        res.status(400).json({ msg: "Faltan campos obligatorios" });
        return;
    }

    if (typeof name !== 'string' || name.trim() === '') {
        res.status(400).json({ msg: "Nombre inválido" });
        return;
    }

    if (typeof price !== 'number' || isNaN(price) || price < 0) {
        res.status(400).json({ msg: "Precio inválido" });
        return;
    }

    if (typeof category !== 'string' || category.trim() === '') {
        res.status(400).json({ msg: "Categoría inválida" });
        return;
    }

    // Generar ID único
    const id = new Date().getTime()

    const newProduct: Product = { id, name, price, category };
    products.push(newProduct);

    res.status(201).json({ msg: "Producto nuevo creado", newProduct });
});

//ACTUALIZA PRODUCTO
app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const { name, price, category } = req.body

    const product = products.find(p => p.id.toString() === id)

    if (!product) {
        res.status(404).json({ msg: "Producto no encontrado" })
        return
    }

    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === '') {
            res.status(400).json({ msg: "Nombre inválido" })
            return
        }
        product.name = name
    }

    if (price !== undefined) {
        if (typeof price !== 'number' || isNaN(price) || price < 0) {
            res.status(400).json({ msg: "Precio inválido" })
            return
        }
        product.price = price
    }

    if (category !== undefined) {
        if (typeof category !== 'string' || category.trim() === '') {
            res.status(400).json({ msg: "Categoría inválida" })
            return
        }
        product.category = category
    }

    res.json(product)
})

//Eliminar producto
app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const index = products.findIndex(p => p.id.toString() === id)

    if (index === -1) {
        res.status(404).json({ msg: "Producto no encontrado" })
        return
    }

    const deletedProduct = products.splice(index, 1)[0]
    res.json({ msg: "Producto eliminado", producto: deletedProduct })
})

//ELIMINAMOS POR NOMBRE
app.delete('/products/by-name/:name', (req: Request, res: Response) => {
    const nameToDelete = req.params.name;

    // Productos antes de eliminar
    const originalLength = products.length;

    // Filtramos los productos dejando solo los que NO tienen ese nombre
    const productsFiltered = products.filter(p => p.name !== nameToDelete);

    // Calculamos cuántos eliminamos
    const deletedCount = originalLength - productsFiltered.length;

    if (deletedCount === 0) {
        res.status(404).json({ msg: "No se encontraron productos con ese nombre" });
        return;
    }

    // Actualizamos el array original (suponiendo que 'products' es mutable)
    products.length = 0;
    products.push(...productsFiltered);

    res.json({ msg: `Se eliminaron ${deletedCount} productos con el nombre ${nameToDelete}` });
});



app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`)
})


/*app.get('/products/search', (req: Request, res: Response) => {
    const name = (req.query.name as string)?.toLowerCase() || ""
    const maxPrice = parseFloat(req.query.maxPrice as string)

    if (isNaN(maxPrice)) {
        res.status(400).json({ msg: "Parámetro maxPrice inválido" })
        return
    }

    const productosEncontrados = products.filter(product =>
        product.name.toLowerCase().includes(name) &&
        product.price <= maxPrice
    )

    if (productosEncontrados.length === 0) {
        res.status(404).json({ msg: "No se encontraron productos" })
        return
    }

    res.json(productosEncontrados)
});*/

/*app.get('/products/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const productoEncontrado = products.find(product => product.id === id)

    if (!productoEncontrado) {
        res.status(404).json({ msg: "Producto no encontrado" })
        return
    }

    res.json(productoEncontrado)
});*/
