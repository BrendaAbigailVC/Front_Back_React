import { useState, useEffect } from "react";
import type { Product } from "./ListaProductos";

interface EditModalProps {
  producto: Product | null;
  show: boolean;
  onClose: () => void;
  onSave: (productoActualizado: Product) => void;
}

const EditModal = ({ producto, show, onClose, onSave }: EditModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (producto) {
      setName(producto.name);
      setPrice(producto.price);
      setCategory(producto.category);
    }
  }, [producto]);

  if (!show) return null;

  const handleSave = () => {
    if (!name.trim() || price === "" || price < 0 || !category.trim()) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    onSave({
      id: producto?.id,
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
    });
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Producto</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) =>
                  setPrice(e.currentTarget.value === "" ? "" : Number(e.currentTarget.value))
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
