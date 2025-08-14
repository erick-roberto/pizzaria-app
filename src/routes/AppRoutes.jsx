import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import CadastroCliente from "../pages/CadastroCliente";  // <-- importe aqui
import Cardapio from "../pages/Cardapio";
import Cozinha from "../pages/Cozinha";
import Entregas from "../pages/Entregas";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Carrinho from "../pages/Carrinho";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Nova rota pública para cadastro */}
      <Route path="/cadastro" element={<CadastroCliente />} />
      
      <Route path="/cardapio" element={<Cardapio />} />
      
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
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
