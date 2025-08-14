// Importa useState do React para gerenciar o estado dos pedidos
import { useState } from "react";

// Importa o contexto de pedidos previamente criado
import { PedidosContext } from "./PedidosContext";

// Componente Provider que engloba a aplicação e fornece o contexto de pedidos
export default function PedidosProvider({ children }) {
  // Estado que guarda os pedidos que estão em preparação na cozinha
  const [preparacao, setPreparacao] = useState([]);

  // Estado que guarda os pedidos que estão prontos para entrega
  const [entrega, setEntrega] = useState([]);

  // Função para adicionar um novo pedido à cozinha
  const adicionarPedido = (pedido) => {
    setPreparacao((prev) => [...prev, pedido]); // adiciona ao estado de preparação
  };

  // Função para marcar um pedido como pronto e movê-lo para entrega
  const pedidoPronto = (id) => {
    // Busca o pedido pelo id na lista de preparação
    const pedido = preparacao.find((p) => p.id === id);

    if (pedido) {
      // Remove o pedido da lista de preparação
      setPreparacao((prev) => prev.filter((p) => p.id !== id));
      // Adiciona o pedido à lista de entrega
      setEntrega((prev) => [...prev, pedido]);
    }
  };

  // Função para remover um pedido da entrega (ex: quando é entregue ao cliente)
  const pedidoEntregue = (id) => {
    setEntrega((prev) => prev.filter((p) => p.id !== id));
  };

  // Provedor do contexto que passa os estados e funções para os componentes filhos
  return (
    <PedidosContext.Provider
      value={{
        preparacao,       // pedidos em preparo
        entrega,          // pedidos prontos para entrega
        adicionarPedido,  // função para adicionar pedido
        pedidoPronto,     // função para marcar pedido como pronto
        pedidoEntregue    // função para remover pedido entregue
      }}
    >
      {children} {/* Renderiza os componentes filhos que consomem este contexto */}
    </PedidosContext.Provider>
  );
}
