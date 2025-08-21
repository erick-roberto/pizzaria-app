import Cliente from "../components/Cliente";
import Entrega from "../components/Entrega";
import Mesa from "../components/Mesa";
import Promocao from "../components/Promocao";
import Cart from "../components/Cart";
import CustomizationPanel from "../components/CustomizationPanel";

export default function Checkout() {
  return (
    <div className="checkout-page p-4">
      <CustomizationPanel />
      <Cliente />
      <Entrega />
      <Mesa />
      <Promocao />
      <Cart />
    </div>
  );
}
