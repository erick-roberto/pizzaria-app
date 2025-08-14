import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import ItemComanda from "../components/ItemComanda";
import axios from "axios";

export default function Carrinho() {
  const { cart, removeFromCart, clearCart, setCart } = useContext(CartContext);
  const [mesaOuEndereco, setMesaOuEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");

  const total = cart.reduce((acc, item) => acc + item.preco * item.quantity, 0);

  const handleChangeQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const enviarPedido = async () => {
    if (!mesaOuEndereco) {
      setMensagem("Informe o número da mesa ou endereço!");
      return;
    }
    const pedido = {
      itens: cart,
      total,
      mesaOuEndereco,
      status: "Em preparo",
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:5000/pedidos", pedido);
      setMensagem("Pedido enviado para a cozinha!");
      clearCart();
      setMesaOuEndereco("");
    } catch (err) {
      setMensagem("Erro ao enviar pedido. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Comanda / Carrinho</h2>

      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map(item => (
              <ItemComanda
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onChangeQuantity={handleChangeQuantity}
              />
            ))}
          </ul>

          <h3>Total: R$ {total}</h3>

          <input
            type="text"
            placeholder="Número da mesa ou endereço"
            value={mesaOuEndereco}
            onChange={(e) => setMesaOuEndereco(e.target.value)}
            style={{ padding: 5, width: "100%", marginBottom: 10 }}
          />

          <button onClick={enviarPedido} style={{ padding: "10px 20px" }}>
            Enviar pedido para a cozinha
          </button>

          {mensagem && <p style={{ marginTop: 10 }}>{mensagem}</p>}
        </>
      )}
    </div>
  );
}
