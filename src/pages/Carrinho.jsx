// Importa hooks do React, contexto do carrinho, componente ItemComanda e axios
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import ItemComanda from "../components/ItemComanda";
import axios from "axios";

// Componente Carrinho que exibe os itens adicionados pelo cliente e permite enviar pedidos
export default function Carrinho() {
  // Obtém o carrinho e funções do contexto
  const { cart, removeFromCart, clearCart, setCart } = useContext(CartContext);

  // Estado para armazenar o número da mesa ou endereço do cliente
  const [mesaOuEndereco, setMesaOuEndereco] = useState("");

  // Estado para mensagens de sucesso ou erro ao enviar o pedido
  const [mensagem, setMensagem] = useState("");

  // Calcula o total do carrinho multiplicando preço * quantidade de cada item
  const total = cart.reduce((acc, item) => acc + item.preco * item.quantity, 0);

  // Atualiza a quantidade de um item no carrinho
  const handleChangeQuantity = (id, quantity) => {
    if (quantity < 1) return; // impede quantidade menor que 1
    setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
  };

  // Função para enviar o pedido para o backend
  const enviarPedido = async () => {
    if (!mesaOuEndereco) {
      setMensagem("Informe o número da mesa ou endereço!");
      return;
    }

    // Cria objeto de pedido com itens, total, mesa/endereço e status
    const pedido = {
      itens: cart,
      total,
      mesaOuEndereco,
      status: "Em preparo",
      createdAt: new Date().toISOString(),
    };

    try {
      // Envia o pedido para o backend via POST
      await axios.post("http://localhost:5000/pedidos", pedido);

      // Limpa carrinho e input após envio
      setMensagem("Pedido enviado para a cozinha!");
      clearCart();
      setMesaOuEndereco("");
    } catch (err) {
      // Em caso de erro, exibe mensagem
      setMensagem("Erro ao enviar pedido. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Comanda / Carrinho</h2>

      {/* Se o carrinho estiver vazio */}
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          {/* Lista de itens do carrinho */}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map(item => (
              <ItemComanda
                key={item.id}
                item={item}
                onRemove={removeFromCart}          // remove item do carrinho
                onChangeQuantity={handleChangeQuantity} // altera quantidade do item
              />
            ))}
          </ul>

          {/* Mostra o total do pedido */}
          <h3>Total: R$ {total}</h3>

          {/* Input para número da mesa ou endereço */}
          <input
            type="text"
            placeholder="Número da mesa ou endereço"
            value={mesaOuEndereco}
            onChange={(e) => setMesaOuEndereco(e.target.value)}
            style={{ padding: 5, width: "100%", marginBottom: 10 }}
          />

          {/* Botão para enviar pedido */}
          <button onClick={enviarPedido} style={{ padding: "10px 20px" }}>
            Enviar pedido para a cozinha
          </button>

          {/* Mensagem de sucesso ou erro */}
          {mensagem && <p style={{ marginTop: 10 }}>{mensagem}</p>}
        </>
      )}
    </div>
  );
}
