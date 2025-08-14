import { useContext, useEffect } from "react";
import { PedidosContext } from "../context/PedidosContext";
import axios from "axios";

export default function Cozinha() {
  const { preparacao, adicionarPedido, pedidoPronto } = useContext(PedidosContext);

  useEffect(() => {
    // Buscar pedidos em preparo
    axios.get("http://localhost:5000/pedidos?status=Em preparo")
      .then(res => {
        res.data.forEach(pedido => adicionarPedido(pedido));
      })
      .catch(err => console.error("Erro ao buscar pedidos:", err));
  }, []);

  const marcarPronto = (id) => {
    axios.patch(`http://localhost:5000/pedidos/${id}`, { status: "Pronto" })
      .then(() => {
        pedidoPronto(id);
      })
      .catch(err => console.error("Erro ao atualizar pedido:", err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Pedidos em preparação</h2>
      {preparacao.length === 0 && <p>Nenhum pedido em preparação.</p>}

      {preparacao.map(p => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            margin: 10,
            padding: 10,
            borderRadius: 8
          }}
        >
          <p><b>Mesa/Endereço:</b> {p.mesaOuEndereco}</p>
          <p>
            <b>Pizzas:</b> {p.itens.map(i => `${i.nome} (x${i.quantity})`).join(", ")}
          </p>
          <button onClick={() => marcarPronto(p.id)}>Pedido Pronto</button>
        </div>
      ))}
    </div>
  );
}
