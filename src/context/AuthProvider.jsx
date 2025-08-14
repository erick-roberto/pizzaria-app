// Importa useState do React para gerenciar o estado do usuário
import { useState } from "react";

// Importa o contexto de autenticação criado previamente
import { AuthContext } from "./AuthContext";

// Componente Provider que engloba toda a aplicação e fornece o contexto de autenticação
export default function AuthProvider({ children }) {
  
  // Estado 'user' que guarda os dados do usuário logado
  // Inicializa verificando se existe um usuário salvo no localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user"); // pega o usuário do localStorage
    return savedUser ? JSON.parse(savedUser) : null; // se existir, converte de JSON para objeto; caso contrário, null
  });

  // Função de login: recebe os dados do usuário
  const login = (userData) => {
    setUser(userData); // atualiza o estado com o usuário logado
    localStorage.setItem("user", JSON.stringify(userData)); // salva no localStorage para persistir após refresh
  };

  // Função de logout: remove o usuário do estado e do localStorage
  const logout = () => {
    setUser(null); // limpa o estado do usuário
    localStorage.removeItem("user"); // remove do localStorage
  };

  // Provedor do contexto que passa o estado 'user' e as funções de login/logout para todos os componentes filhos
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} {/* Renderiza os componentes filhos que usam este contexto */}
    </AuthContext.Provider>
  );
}
