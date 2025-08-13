import { useEffect, useState } from "react";
import axios from "axios";
import PizzaCard from "../components/PizzaCard";

export default function Cardapio() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/pizzas").then((res) => setPizzas(res.data));
  }, []);

  const handleAdd = (pizza) => {
    alert(`Pizza ${pizza.nome} adicionada ao carrinho`);
  };

  return (
    <div className="cardapio-lista">
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} onAdd={handleAdd} />
      ))}
    </div>
  );
}
