import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

export default function Cart() {
  const { cart, limparCarrinho } = useContext(CartContext);

  const enviarPedido = async () => {
    if (cart.items.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }

    if (!cart.cliente.nome || !cart.cliente.endereco) {
      alert("Preencha os dados do cliente!");
      return;
    }

    // Monta o pedido com todos os dados necessários
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
      entrega: {
        entregador: cart.entrega.entregador,
        taxa: cart.entrega.taxa,
      },
      mesa: {
        numero: cart.mesa.numero,
        garcom: cart.mesa.garcom,
        taxaGarcom: cart.mesa.taxaGarcom,
      },
      promocao: cart.promocao,
      cliente: cart.cliente,
      createdAt: new Date().toISOString(),
    };

    try {
      // Envia pedido para o backend
      await axios.post("http://localhost:5000/pedidos", pedido);
      alert("Pedido enviado para a cozinha!");

      // Limpa o carrinho após envio
      limparCarrinho();
    } catch (err) {
      console.error("Erro ao enviar pedido:", err);
      alert("Erro ao enviar pedido!");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2>Carrinho</h2>

      {cart.items.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          {cart.items.map((item, index) => (
            <p key={index}>
              {item.nome} ({item.tamanho}) - R$ {item.preco} x {item.quantity}
            </p>
          ))}

          <p><strong>Cliente:</strong> {cart.cliente.nome} - {cart.cliente.endereco}</p>

          {cart.mesa.numero && (
            <p><strong>Mesa:</strong> {cart.mesa.numero} - Garçom: {cart.mesa.garcom}</p>
          )}

          {cart.entrega.entregador && (
            <p><strong>Entrega:</strong> {cart.entrega.entregador} - Taxa: R$ {cart.entrega.taxa}</p>
          )}

          <p><strong>Promoção:</strong> {cart.promocao?.nome || "Nenhuma"}</p>
          <p><strong>Total:</strong> R$ {cart.total.toFixed(2)}</p>

          <button onClick={enviarPedido}>Enviar Pedido</button>
        </>
      )}
    </div>
  );
}
