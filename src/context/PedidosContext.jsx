import { createContext, useState } from "react";

export const PedidosContext = createContext();

export default function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);

  // Adiciona pedido sem duplicar
  const adicionarPedido = (pedido) => {
    setPedidos(prev => {
      if (prev.some(p => p.id === pedido.id)) return prev;
      return [...prev, pedido];
    });
  };

  // Marca pedido como pronto
  const pedidoPronto = (id) => {
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, status: "Pronto" } : p));
  };

  // Retorna apenas pedidos em preparação
  const pedidosEmPreparo = () => pedidos.filter(p => p.status === "Em preparo");

  // Retorna apenas pedidos prontos (para entrega)
  const pedidosProntos = () => pedidos.filter(p => p.status === "Pronto");

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        adicionarPedido,
        pedidoPronto,
        pedidosEmPreparo,
        pedidosProntos,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
