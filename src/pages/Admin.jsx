import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [pizzas, setPizzas] = useState([]);
  const [novaPizza, setNovaPizza] = useState({ nome: "", ingredientes: "", preco: 0, tamanho: "Média", imagem: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/pizzas").then(res => setPizzas(res.data));
  }, []);

  const adicionarPizza = () => {
    const pizzaObj = {
      ...novaPizza,
      ingredientes: novaPizza.ingredientes.split(",").map(i => i.trim())
    };
    axios.post("http://localhost:5000/pizzas", pizzaObj)
      .then(res => setPizzas([...pizzas, res.data]));
  };

  const excluirPizza = (id) => {
    axios.delete(`http://localhost:5000/pizzas/${id}`)
      .then(() => setPizzas(pizzas.filter(p => p.id !== id)));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Gerenciar Cardápio</h2>

      <input placeholder="Nome" value={novaPizza.nome} onChange={(e) => setNovaPizza({ ...novaPizza, nome: e.target.value })} />
      <input placeholder="Ingredientes (separados por vírgula)" value={novaPizza.ingredientes} onChange={(e) => setNovaPizza({ ...novaPizza, ingredientes: e.target.value })} />
      <input placeholder="Preço" type="number" value={novaPizza.preco} onChange={(e) => setNovaPizza({ ...novaPizza, preco: parseFloat(e.target.value) })} />
      <input placeholder="Tamanho" value={novaPizza.tamanho} onChange={(e) => setNovaPizza({ ...novaPizza, tamanho: e.target.value })} />
      <input placeholder="URL da imagem" value={novaPizza.imagem} onChange={(e) => setNovaPizza({ ...novaPizza, imagem: e.target.value })} />
      <button onClick={adicionarPizza}>Adicionar Pizza</button>

      <ul>
        {pizzas.map(p => (
          <li key={p.id}>
            {p.nome} - R$ {p.preco} <button onClick={() => excluirPizza(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
