// src/components/EliminarPorNombre.tsx
import { useState } from "react";

interface Props {
  onEliminar: (name: string) => void;
}

const EliminarPorNombre = ({ onEliminar }: Props) => {
  const [nombre, setNombre] = useState("");

  const handleEliminar = () => {
    if (nombre.trim() === "") {
      console.log("Por favor ingresa un nombre válido");
      return;
    }
    onEliminar(nombre.trim());
    setNombre("");
  };

  return (
    <div className="mb-3 p-3 border rounded bg-light shadow-sm" style={{ maxWidth: "700px" }}>
      <h3 className="mb-3 fs-4 text-secondary">Eliminar productos por nombre</h3>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="form-control mb-3"
      />
      <button
        onClick={handleEliminar}
        className="btn btn-primary w-100 fw-semibold"
      >
        Eliminar
      </button>
    </div>
  );
};

export default EliminarPorNombre;
