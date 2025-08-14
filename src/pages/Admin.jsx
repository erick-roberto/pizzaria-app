// Importa hooks do React e biblioteca axios para requisições HTTP
import { useEffect, useState } from "react";
import axios from "axios";

// Componente Admin para gerenciar o cardápio de pizzas
export default function Admin() {
  // Estado que armazena todas as pizzas do cardápio
  const [pizzas, setPizzas] = useState([]);

  // Estado temporário para armazenar os dados da nova pizza que será adicionada
  const [novaPizza, setNovaPizza] = useState({
    nome: "",
    ingredientes: "",
    preco: 0,
    tamanho: "Média",
    imagem: ""
  });

  // useEffect para buscar as pizzas do backend ao carregar o componente
  useEffect(() => {
    axios.get("http://localhost:5000/pizzas")
      .then(res => setPizzas(res.data)); // atualiza o estado com os dados retornados
  }, []);

  // Função para adicionar uma nova pizza ao cardápio
  const adicionarPizza = () => {
    // Cria o objeto pizza, transformando os ingredientes em array
    const pizzaObj = {
      ...novaPizza,
      ingredientes: novaPizza.ingredientes.split(",").map(i => i.trim()) // separa por vírgula e remove espaços
    };

    // Envia a pizza para o backend via POST e adiciona no estado local
    axios.post("http://localhost:5000/pizzas", pizzaObj)
      .then(res => setPizzas([...pizzas, res.data]));
  };

  // Função para excluir uma pizza do cardápio
  const excluirPizza = (id) => {
    axios.delete(`http://localhost:5000/pizzas/${id}`)
      .then(() => setPizzas(pizzas.filter(p => p.id !== id))); // remove do estado local
  };

  return (
    <div style={{ padding: 20 }} className="admin-container">
      <h2>Gerenciar Cardápio</h2>

      {/* Inputs para adicionar nova pizza */}
      <input 
        placeholder="Nome" 
        value={novaPizza.nome} 
        onChange={(e) => setNovaPizza({ ...novaPizza, nome: e.target.value })} 
      />
      <input 
        placeholder="Ingredientes (separados por vírgula)" 
        value={novaPizza.ingredientes} 
        onChange={(e) => setNovaPizza({ ...novaPizza, ingredientes: e.target.value })} 
      />
      Preço:
      <input 
        placeholder="Preço" 
        type="number" 
        min="0" 
        value={novaPizza.preco} 
        onChange={(e) => setNovaPizza({ ...novaPizza, preco: parseFloat(e.target.value) })} 
      />
      Tamanho:
      <label>
        <select 
          value={novaPizza.tamanho} 
          onChange={(e) => setNovaPizza({ ...novaPizza, tamanho: e.target.value })}
        >
          <option value="Pequena">Pequena</option>
          <option value="Média">Média</option>
          <option value="Grande">Grande</option>
        </select> 
      </label>
      <input 
        placeholder="URL da imagem" 
        value={novaPizza.imagem} 
        onChange={(e) => setNovaPizza({ ...novaPizza, imagem: e.target.value })} 
      />
      <button onClick={adicionarPizza}>Adicionar Pizza</button>

      {/* Lista de pizzas do cardápio com botão para excluir */}
      <ul>
        {pizzas.map(p => (
          <li key={p.id}>
            {p.nome} - R$ {p.preco} 
            <button onClick={() => excluirPizza(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
