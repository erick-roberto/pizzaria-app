import { useState } from "react";
import { PedidosContext } from "./PedidosContext";

export default function PedidosProvider({ children }) {
  const [preparacao, setPreparacao] = useState([]); // pedidos em preparação
  const [entrega, setEntrega] = useState([]);       // pedidos prontos para entrega

  // Adicionar novo pedido na cozinha
  const adicionarPedido = (pedido) => {
    setPreparacao((prev) => [...prev, pedido]);
  };

  // Marcar pedido como pronto e mover para entrega
  const pedidoPronto = (id) => {
    const pedido = preparacao.find((p) => p.id === id);
    if (pedido) {
      setPreparacao((prev) => prev.filter((p) => p.id !== id));
      setEntrega((prev) => [...prev, pedido]);
    }
  };

  // Remover pedido da entrega (ex: entregue ao cliente)
  const pedidoEntregue = (id) => {
    setEntrega((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PedidosContext.Provider
      value={{
        preparacao,
        entrega,
        adicionarPedido,
        pedidoPronto,
        pedidoEntregue
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
