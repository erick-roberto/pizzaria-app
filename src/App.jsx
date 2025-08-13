import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import AuthProvider from "./context/AuthProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="main-container">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
