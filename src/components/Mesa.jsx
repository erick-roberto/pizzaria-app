import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Mesa() {
  const { setMesaGarcom } = useContext(CartContext);
  const [numero, setNumero] = useState("");
  const [garcom, setGarcom] = useState("");
  const [taxa, setTaxa] = useState(0);

  const handleSave = () => {
    setMesaGarcom(numero, garcom, taxa);
    setNumero("");
    setGarcom("");
    setTaxa(0);
    alert("Mesa e garçom registrados!");
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2>Mesa e Garçom</h2>
      <input
        type="text"
        placeholder="Número da mesa"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nome do garçom"
        value={garcom}
        onChange={(e) => setGarcom(e.target.value)}
      />
      <input
        type="number"
        placeholder="Taxa opcional"
        value={taxa}
        onChange={(e) => setTaxa(e.target.value)}
      />
      <button onClick={handleSave}>Salvar Mesa</button>
    </div>
  );
}
