import { useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    items: [],
    cliente: { nome: "", endereco: "" },
    entrega: { entregador: "", taxa: 0 },
    mesa: { numero: "", garcom: "", taxaGarcom: 0 },
    promocao: null,
    total: 0,
    historicoPagamentos: [],
  });

  const addItem = (item) => {
    setCart((prev) => ({
      ...prev,
      items: [...prev.items, item],
      total: prev.total + Number(item.preco),
    }));
  };

  const setCliente = (nome, endereco) => {
    setCart((prev) => ({ ...prev, cliente: { nome, endereco } }));
  };

  const setEntrega = (entregador, taxa) => {
    setCart((prev) => ({
      ...prev,
      entrega: { entregador, taxa: Number(taxa) },
      total: prev.total + Number(taxa),
    }));
  };

  const setMesaGarcom = (numero, garcom, taxaGarcomOpcional = 0) => {
    setCart((prev) => ({
      ...prev,
      mesa: { numero, garcom, taxaGarcom: Number(taxaGarcomOpcional) },
      total: prev.total + Number(taxaGarcomOpcional),
    }));
  };

  const aplicarPromocao = (nome, desconto) => {
    setCart((prev) => ({
      ...prev,
      promocao: { nome, desconto },
      total: prev.total - (prev.total * desconto) / 100,
    }));
  };

  const registrarPagamento = () => {
    const data = new Date().toLocaleString();
    const valorRecebido = cart.total;
    setCart((prev) => ({
      ...prev,
      historicoPagamentos: [
        ...prev.historicoPagamentos,
        { nome: prev.cliente.nome, data, valorRecebido },
      ],
    }));
    alert("Pagamento registrado!");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        setCliente,
        setEntrega,
        setMesaGarcom,
        aplicarPromocao,
        registrarPagamento,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
