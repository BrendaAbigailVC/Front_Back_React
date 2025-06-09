"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const data_1 = require("./data");
const app = (0, express_1.default)();
const PORT = 5000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((0, cors_1.default)());
//OBTENER PRODUCTOS
app.get('/products', (req, res) => {
    res.json({ products: data_1.products });
});
//FILTRAR POOR CATEGORIA
app.get('/products/by-category', (req, res) => {
    var _a;
    const category = (_a = req.query.category) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (!category) {
        res.status(400).json({ msg: "Categoría requerida" });
        return;
    }
    const filtered = data_1.products.filter(p => p.category.toLowerCase() === category);
    if (filtered.length === 0) {
        res.status(404).json({ msg: "No se encontraron productos en esa categoría" });
        return;
    }
    res.json(filtered);
});
//BUSCAR PRODUCTO POR NOMBRE Y MAXPRECIO
app.get('/products/search', (req, res) => {
    var _a;
    const name = ((_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
    const maxPrice = parseFloat(req.query.maxPrice);
    if (isNaN(maxPrice)) {
        res.status(400).json({ msg: "Parámetro maxPrice inválido" });
        return;
    }
    const productosEncontrados = [];
    for (let product of data_1.products) {
        const nombreAjustado = product.name.toLowerCase();
        if (nombreAjustado.includes(name) && product.price <= maxPrice) {
            productosEncontrados.push(product);
        }
    }
    if (productosEncontrados.length === 0) {
        res.status(404).json({ msg: "No se encontraron productos" });
        return;
    }
    res.json(productosEncontrados);
});
//BUSCAR PRODUCTOS POR ID
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    let productoEncontrado = null;
    for (let product of data_1.products) {
        if (product.id.toString() == id) {
            productoEncontrado = product;
        }
    }
    if (productoEncontrado == null) {
        res.status(400).json({
            msg: "Id incorrecto"
        });
        return;
    }
    res.json(productoEncontrado);
});
//CREACION DE PRODUCTO
app.post('/products', (req, res) => {
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
    const id = new Date().getTime();
    const newProduct = { id, name, price, category };
    data_1.products.push(newProduct);
    res.status(201).json({ msg: "Producto nuevo creado", newProduct });
});
//ACTUALIZA PRODUCTO
app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const { name, price, category } = req.body;
    const product = data_1.products.find(p => p.id.toString() === id);
    if (!product) {
        res.status(404).json({ msg: "Producto no encontrado" });
        return;
    }
    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === '') {
            res.status(400).json({ msg: "Nombre inválido" });
            return;
        }
        product.name = name;
    }
    if (price !== undefined) {
        if (typeof price !== 'number' || isNaN(price) || price < 0) {
            res.status(400).json({ msg: "Precio inválido" });
            return;
        }
        product.price = price;
    }
    if (category !== undefined) {
        if (typeof category !== 'string' || category.trim() === '') {
            res.status(400).json({ msg: "Categoría inválida" });
            return;
        }
        product.category = category;
    }
    res.json(product);
});
//Eliminar producto
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const index = data_1.products.findIndex(p => p.id.toString() === id);
    if (index === -1) {
        res.status(404).json({ msg: "Producto no encontrado" });
        return;
    }
    const deletedProduct = data_1.products.splice(index, 1)[0];
    res.json({ msg: "Producto eliminado", producto: deletedProduct });
});
//ELIMINAMOS POR NOMBRE
app.delete('/products/by-name/:name', (req, res) => {
    const nameToDelete = req.params.name;
    // Productos antes de eliminar
    const originalLength = data_1.products.length;
    // Filtramos los productos dejando solo los que NO tienen ese nombre
    const productsFiltered = data_1.products.filter(p => p.name !== nameToDelete);
    // Calculamos cuántos eliminamos
    const deletedCount = originalLength - productsFiltered.length;
    if (deletedCount === 0) {
        res.status(404).json({ msg: "No se encontraron productos con ese nombre" });
        return;
    }
    // Actualizamos el array original (suponiendo que 'products' es mutable)
    data_1.products.length = 0;
    data_1.products.push(...productsFiltered);
    res.json({ msg: `Se eliminaron ${deletedCount} productos con el nombre ${nameToDelete}` });
});
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
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
