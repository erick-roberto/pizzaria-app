import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";

// Contextos
import AuthProvider from "./context/AuthProvider";
import CartProvider from "./context/CartProvider";
import PedidosProvider from "./context/PedidosProvider";

export default function App() {
  return (
    <BrowserRouter>
      {/* Contexto de autenticação */}
      <AuthProvider>
        {/* Contexto do carrinho */}
        <CartProvider>
          {/* Contexto de pedidos (cozinha e entregas) */}
          <PedidosProvider>
            {/* Header em todas as páginas */}
            <Header />

            {/* Área onde as rotas da aplicação serão renderizadas */}
            <div className="main-container">
              <AppRoutes />
            </div>
          </PedidosProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
