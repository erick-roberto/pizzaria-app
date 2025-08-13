import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Página não encontrada</h2>
      <p>Verifique o endereço digitado.</p>
      <p>Voltar para o <Link to="/cardapio">Cardápio</Link>.</p>
    </div>
  );
}
