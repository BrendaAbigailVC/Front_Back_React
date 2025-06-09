import { useState } from "react"

interface FormularioProps {
    agregar: (producto: { name: string; price: number; category: string }) => void;
}

const Formulario = (props: FormularioProps) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const handleAgregar = () => {
        const precioNumero = parseFloat(price);

        if (isNaN(precioNumero)) {
            console.log("El precio debe ser un número válido");
            return;
        }

        props.agregar({
            name: name.trim(),
            price: precioNumero,
            category: category.trim(),
        });

        // Limpiar el formulario
        setName("");
        setPrice("");
        setCategory("");
    };

    return (
        <div className="mb-4 p-3 border rounded bg-light shadow-sm" style={{ maxWidth: "700px" }}>
            <h3 className="mb-3 fs-4 text-secondary">Agrega producto</h3>

            <input
                className="form-control mb-3"
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}

            />

            <input
                className="form-control mb-3"
                type="text"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.currentTarget.value)}
            />

            <input
                className="form-control mb-3"
                type="text"
                placeholder="Categoria"
                value={category}
                onChange={(e) => setCategory(e.currentTarget.value)}
            />

            <div className="d-flex justify-content-center">
                <button
                    className="btn btn-primary fw-semibold"
                    style={{ width: "200px" }}
                    type="button"
                    onClick={handleAgregar}
                >
                    Agregar
                </button>
            </div>

        </div>
    );
};

export default Formulario;