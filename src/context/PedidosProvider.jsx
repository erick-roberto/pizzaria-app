import { createContext, useState } from "react";

export const PedidosContext = createContext();

export default function PedidosProvider({ children }) {
  const [preparacao, setPreparacao] = useState([]); // pedidos em preparo
  const [entrega, setEntrega] = useState([]);       // pedidos prontos para entrega

  // Substitui todos os pedidos em preparo (evita duplicação)
  const setPedidosPreparacao = (pedidos) => {
    setPreparacao(pedidos);
  };

  // Marca um pedido como pronto: remove da preparação e adiciona na entrega
  const pedidoPronto = (id) => {
    const pedido = preparacao.find(p => p.id === id);
    if (!pedido) return;
    setPreparacao(preparacao.filter(p => p.id !== id));
    setEntrega([...entrega, pedido]);
  };

  // Adicionar novo pedido manualmente (opcional)
  const adicionarPedido = (pedido) => {
    // Evita duplicação pelo id
    if (!preparacao.some(p => p.id === pedido.id)) {
      setPreparacao([...preparacao, pedido]);
    }
  };

  return (
    <PedidosContext.Provider
      value={{
        preparacao,
        entrega,
        setPedidosPreparacao,
        adicionarPedido,
        pedidoPronto,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
