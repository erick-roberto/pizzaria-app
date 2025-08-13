import { useEffect, useState } from "react";
import axios from "axios";
import PizzaCard from "../components/PizzaCard";
import "../index.css"; // garante que o CSS global seja carregado

export default function Cardapio() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/pizzas")
      .then((res) => setPizzas(res.data))
      .catch((err) => console.error("Erro ao buscar pizzas:", err));
  }, []);

  const handleAdd = (pizza) => {
    alert(`Pizza ${pizza.nome} adicionada ao carrinho`);
  };

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
