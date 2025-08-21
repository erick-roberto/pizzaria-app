import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, registrarPagamento } = useContext(CartContext);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2>Carrinho</h2>
      {cart.items.map((item, index) => (
        <p key={index}>{item.nome} - R$ {item.preco}</p>
      ))}
      <p><strong>Cliente:</strong> {cart.cliente.nome} - {cart.cliente.endereco}</p>
      <p><strong>Entregador:</strong> {cart.entrega.entregador} - R$ {cart.entrega.taxa}</p>
      <p><strong>Mesa:</strong> {cart.mesa.numero} - Garçom: {cart.mesa.garcom} - R$ {cart.mesa.taxaGarcom}</p>
      <p><strong>Promoção:</strong> {cart.promocao?.nome || "Nenhuma"}</p>
      <p><strong>Total:</strong> R$ {cart.total.toFixed(2)}</p>
      <button onClick={registrarPagamento}>Registrar Pagamento</button>
    </div>
  );
}
