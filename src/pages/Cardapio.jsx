import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PizzaCard from "../components/PizzaCard";
import "../index.css";
import { CartContext } from "../context/CartContext";

export default function Cardapio() {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useContext(CartContext); // <- useContext aqui

  // Função para adicionar pizza ao carrinho
  const handleAdd = (pizza) => {
    addToCart(pizza);
    alert(`Pizza ${pizza.nome} adicionada ao carrinho!`);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/pizzas")
      .then((res) => setPizzas(res.data))
      .catch((err) => console.error("Erro ao buscar pizzas:", err));
  }, []);

  return (
    <div>
      <h2 style={{ padding: "20px 20px 0 20px" }}>🍕 Cardápio</h2>
      <div className="pizzas-grid">
        {pizzas.length > 0 ? (
          pizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} onAdd={handleAdd} />
          ))
        ) : (
          <p style={{ padding: 20 }}>Nenhuma pizza disponível no momento.</p>
        )}
      </div>
    </div>
  );
}
