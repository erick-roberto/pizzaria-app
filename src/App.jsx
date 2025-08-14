// Importa BrowserRouter para gerenciar rotas da aplicação
import { BrowserRouter } from "react-router-dom";

// Importa o componente que define todas as rotas da aplicação
import AppRoutes from "./routes/AppRoutes";

// Importa o Header que aparece em todas as páginas
import Header from "./components/Header";

// Importa os contextos que vão gerenciar estados globais
import AuthProvider from "./context/AuthProvider";      // contexto de autenticação
import CartProvider from "./context/CartProvider";      // contexto do carrinho
import PedidosProvider from "./context/PedidosProvider"; // contexto de pedidos

// Componente principal da aplicação
export default function App() {
  return (
    // BrowserRouter habilita navegação via URL no React
    <BrowserRouter>

      {/* AuthProvider disponibiliza o contexto de autenticação para toda a aplicação */}
      <AuthProvider>

        {/* CartProvider disponibiliza o contexto do carrinho */}
        <CartProvider>

          {/* PedidosProvider disponibiliza o contexto de pedidos (cozinha e entregas) */}
          <PedidosProvider> 
            
            {/* Header é renderizado em todas as páginas */}
            <Header /> 

            {/* Container principal onde as rotas da aplicação serão renderizadas */}
            <div className="main-container">
              <AppRoutes /> 
            </div>

          </PedidosProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
