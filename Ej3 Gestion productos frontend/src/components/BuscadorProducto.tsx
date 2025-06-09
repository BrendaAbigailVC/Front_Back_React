import { useState } from "react";

interface Props {
  onBuscar: (name: string, maxPrice: number) => void;
}

const BuscadorProducto = ({ onBuscar }: Props) => {
  const [name, setName] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(100);

  const handleBuscar = () => {
    if (name.trim() === "") {
      alert("Por favor ingresa un nombre válido");
      return;
    }
    if (maxPrice < 0) {
      alert("El precio máximo no puede ser negativo");
      return;
    }
    onBuscar(name.trim(), maxPrice);
  };

  return (
    <div className="mb-4 fs-4 p-3 border rounded bg-light shadow-sm" style={{ maxWidth: "700px" }}>
      <h3 className="mb-3 text-secondary">Buscar por nombre y precio</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control mb-3"
      />
      <input
        type="number"
        placeholder="Precio máximo"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="form-control mb-3"
        min={0}
      />
      <button
        onClick={handleBuscar}
        className="btn btn-primary w-100 fw-semibold"
      >
        Buscar
      </button>
    </div>
  );
};

export default BuscadorProducto;
