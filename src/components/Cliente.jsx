import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cliente() {
  const { setCliente } = useContext(CartContext);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleSave = () => {
    if (!nome || !endereco) {
      alert("Preencha nome e endereço!");
      return;
    }
    setCliente(nome, endereco);
    alert("Seus dados foram salvos!");
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2>Dados do Cliente</h2>
      <input
        type="text"
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Seu endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
}
