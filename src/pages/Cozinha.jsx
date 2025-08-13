import { useEffect, useState } from "react";
import axios from "axios";

export default function Cozinha() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/pedidos?status=preparando")
      .then(res => setPedidos(res.data));
  }, []);

  const marcarPronto = (id) => {
    axios.patch(`http://localhost:5000/pedidos/${id}`, { status: "pronto" })
      .then(() => setPedidos(pedidos.filter(p => p.id !== id)));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Pedidos em preparação</h2>
      {pedidos.map(p => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p><b>Mesa/Endereço:</b> {p.mesa || p.endereco}</p>
          <p><b>Pizzas:</b> {p.itens.map(i => i.nome).join(", ")}</p>
          <button onClick={() => marcarPronto(p.id)}>Pedido Pronto</button>
        </div>
      ))}
    </div>
  );
}
