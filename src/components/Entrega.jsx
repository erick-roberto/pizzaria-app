import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Entrega() {
  const { setEntrega } = useContext(CartContext);
  const [entregador, setEntregador] = useState("");
  const [taxa, setTaxa] = useState(0);

  const handleSave = () => {
    if (!entregador || !taxa) {
      alert("Preencha nome do entregador e taxa!");
      return;
    }
    setEntrega(entregador, taxa);
    setEntregador("");
    setTaxa(0);
    alert("Entrega registrada!");
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2>Dados da Entrega</h2>
      <input
        type="text"
        placeholder="Nome do entregador"
        value={entregador}
        onChange={(e) => setEntregador(e.target.value)}
      />
      <input
        type="number"
        placeholder="Taxa de entrega"
        value={taxa}
        onChange={(e) => setTaxa(e.target.value)}
      />
      <button onClick={handleSave}>Salvar Entrega</button>
    </div>
  );
}
