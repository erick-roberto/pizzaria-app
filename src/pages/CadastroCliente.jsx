import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CadastroCliente() {
  const [cliente, setCliente] = useState({ nome: "", email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const validarEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const cadastrar = async () => {
    setMensagem("");
    setErro("");

    if (!cliente.nome || !cliente.email || !cliente.senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (!validarEmail(cliente.email)) {
      setErro("Email inválido.");
      return;
    }
    if (cliente.senha.length < 6) {
      setErro("Senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      // Verifica se já existe usuário com esse email
      const res = await axios.get(`http://localhost:5000/users?username=${cliente.email}`);
      if (res.data.length > 0) {
        setErro("Email já cadastrado.");
        return;
      }

      const novoUsuario = {
        username: cliente.email,
        password: cliente.senha,
        role: "cliente",
        nome: cliente.nome,
        email: cliente.email,
      };

      await axios.post("http://localhost:5000/users", novoUsuario);

      setMensagem("Cadastro realizado com sucesso! Você será redirecionado para o login.");
      setCliente({ nome: "", email: "", senha: "" });

      // Redireciona para login após 2 segundos
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            setErro(err.response.data.message);
        } else {
            setErro("Erro ao cadastrar. Tente novamente.");
        }
    }

  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Cliente</h2>

      <input
        type="text"
        placeholder="Nome"
        value={cliente.nome}
        onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={cliente.email}
        onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Senha"
        value={cliente.senha}
        onChange={(e) => setCliente({ ...cliente, senha: e.target.value })}
      />

      <button onClick={cadastrar}>Cadastrar</button>

      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}
