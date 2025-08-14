// Importa Navigate para redirecionamento e useContext para acessar o contexto
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Componente que protege rotas com base na autenticação e no role do usuário
export default function ProtectedRoute({ children, roles }) {
  // Obtém o usuário logado do contexto de autenticação
  const { user } = useContext(AuthContext);

  // Se não houver usuário logado, redireciona para a página de login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Se houver restrição de roles e o role do usuário não estiver incluído, redireciona para /cardapio
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/cardapio" />;
  }

  // Se passar nas validações, renderiza os componentes filhos normalmente
  return children;
}
