import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import AuthProvider from "./context/AuthProvider";
import CartProvider from "./context/CartProvider";
import PedidosProvider from "./context/PedidosProvider"; // importa o provider de pedidos

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <PedidosProvider> {/* agora o contexto de pedidos está disponível */}
            <Header />
            <div className="main-container">
              <AppRoutes />
            </div>
          </PedidosProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
