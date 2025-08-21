import { createContext, useState, useContext } from "react";
import axios from "axios";
import { PedidosContext } from "./PedidosContext";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const { adicionarPedido } = useContext(PedidosContext);

  const [cart, setCart] = useState({
    items: [],
    cliente: { nome: "", endereco: "" },
    entrega: { entregador: "", taxa: 0 },
    mesa: { numero: "", garcom: "", taxaGarcom: 0 },
    promocao: null,
    total: 0,
  });

  const addItem = (item) => {
    setCart(prev => ({
      ...prev,
      items: [...prev.items, item],
      total: prev.total + Number(item.preco * item.quantity),
    }));
  };

  const setCliente = (nome, endereco) => {
    setCart(prev => ({ ...prev, cliente: { nome, endereco } }));
  };

  const setEntrega = (entregador, taxa) => {
    setCart(prev => ({
      ...prev,
      entrega: { entregador, taxa: Number(taxa) },
      total: prev.total + Number(taxa),
    }));
  };

  const setMesaGarcom = (numero, garcom, taxaGarcomOpcional = 0) => {
    setCart(prev => ({
      ...prev,
      mesa: { numero, garcom, taxaGarcom: Number(taxaGarcomOpcional) },
      total: prev.total + Number(taxaGarcomOpcional),
    }));
  };

  const aplicarPromocao = (nome, desconto) => {
    setCart(prev => ({
      ...prev,
      promocao: { nome, desconto },
      total: prev.total - (prev.total * desconto) / 100,
    }));
  };

  const limparCarrinho = () => {
    setCart({
      items: [],
      cliente: { nome: "", endereco: "" },
      entrega: { entregador: "", taxa: 0 },
      mesa: { numero: "", garcom: "", taxaGarcom: 0 },
      promocao: null,
      total: 0,
    });
  };

  const enviarPedido = async () => {
    if (cart.items.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }
    if (!cart.cliente.nome || !cart.cliente.endereco) {
      alert("Preencha os dados do cliente!");
      return;
    }

    const pedido = {
      itens: cart.items.map(item => ({
        id: item.id,
        nome: item.nome,
        tamanho: item.tamanho,
        preco: item.preco,
        quantity: item.quantity,
      })),
      total: cart.total,
      mesaOuEndereco: cart.mesa.numero || cart.cliente.endereco,
      status: "Em preparo",
      entrega: cart.entrega,
      mesa: cart.mesa,
      promocao: cart.promocao,
      cliente: cart.cliente,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post("http://localhost:5000/pedidos", pedido);
      adicionarPedido(res.data); // Adiciona no contexto de pedidos
      alert("Pedido enviado para a cozinha!");
      limparCarrinho();
    } catch (err) {
      console.error("Erro ao enviar pedido:", err);
      alert("Erro ao enviar pedido!");
    }
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
        limparCarrinho,
        enviarPedido,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
