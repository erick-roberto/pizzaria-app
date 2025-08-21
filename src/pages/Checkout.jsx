import Cliente from "../components/Cliente";
import Entrega from "../components/Entrega";
import Mesa from "../components/Mesa";
import Promocao from "../components/Promocao";
import Cart from "../components/Cart";
import CustomizationPanel from "../components/CustomizationPanel";

export default function Checkout() {
  return (
    <div className="checkout-page p-4 flex flex-col gap-6">

      {/* Painel de customização (admin) */}
      <CustomizationPanel />

      {/* Dados do cliente */}
      <Cliente />

      {/* Dados da entrega */}
      <Entrega />

      {/* Mesa e garçom */}
      <Mesa />

      {/* Promoção */}
      <Promocao />

      {/* Carrinho com todos os itens e totais */}
      <Cart />

    </div>
  );
}
