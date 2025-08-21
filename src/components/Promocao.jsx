import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Promocao() {
  const { cart, aplicarPromocao } = useContext(CartContext);

  const handleAplicar = () => {
    aplicarPromocao("10% OFF", 10);
    alert("Promoção aplicada!");
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2>Promoções</h2>
      <button onClick={handleAplicar}>Aplicar 10% OFF</button>
      <p>Promoção atual: {cart.promocao?.nome || "Nenhuma"}</p>
    </div>
  );
}
