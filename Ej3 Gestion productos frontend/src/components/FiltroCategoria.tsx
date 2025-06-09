import { useState } from "react";

interface Props {
  onFiltrar: (categoria: string) => void;
}

const FiltroCategoria = ({ onFiltrar }: Props) => {
  const [categoria, setCategoria] = useState("");

  const handleFiltrar = () => {
    if (categoria.trim() === "") {
      console.log("Por favor ingresa una categoría válida");
      return;
    }
    onFiltrar(categoria.trim());
    setCategoria("");
  };

  return (
    <div className="mb-4 p-3 border rounded bg-light shadow-sm" style={{ maxWidth: "700px" }}>
      <h3 className="mb-3 fs-4 text-secondary">Filtrar por categoría</h3>
      <input
        type="text"
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="form-control mb-3"
      />
      <button
        onClick={handleFiltrar}
        className="btn btn-primary w-100 fw-semibold"
      >
        Filtrar
      </button>
    </div>
  );
};

export default FiltroCategoria;
