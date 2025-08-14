// Importa componentes de roteamento do React Router
import { Routes, Route } from "react-router-dom";

// Importa todas as páginas da aplicação
import Login from "../pages/Login";
import CadastroCliente from "../pages/CadastroCliente";  // Página de cadastro
import Cardapio from "../pages/Cardapio";
import Cozinha from "../pages/Cozinha";
import Entregas from "../pages/Entregas";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute"; // Componente para proteger rotas por role
import Carrinho from "../pages/Carrinho";

// Componente que define todas as rotas da aplicação
export default function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública para login */}
      <Route path="/" element={<Login />} />
      
      {/* Rota pública para cadastro de cliente */}
      <Route path="/cadastro" element={<CadastroCliente />} />
      
      {/* Rota pública para visualizar o cardápio */}
      <Route path="/cardapio" element={<Cardapio />} />
      
      {/* Rotas protegidas: somente usuários com roles específicas podem acessar */}
      <Route
        path="/cozinha"
        element={
          <ProtectedRoute roles={["staff", "admin"]}>
            <Cozinha />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/entregas"
        element={
          <ProtectedRoute roles={["staff", "admin"]}>
            <Entregas />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/carrinho"
        element={
          <ProtectedRoute roles={["cliente"]}>
            <Carrinho />
          </ProtectedRoute>
        }
      />
      
      {/* Rota curinga: qualquer caminho não definido mostra página 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
